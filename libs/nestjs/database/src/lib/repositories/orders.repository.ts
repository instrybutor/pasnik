import { Brackets, EntityRepository, Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

import {
  CreateOrderDto,
  MarkAsDeliveredDto,
  MarkAsOrderedDto,
  OrderStatus,
} from '@pasnik/api/data-transfer';
import { HttpException, HttpStatus } from '@nestjs/common';
import { addMinutes, sub } from 'date-fns';
import {
  OperationEntity,
  OrderEntity,
  UserEntity,
  WorkspaceEntity,
  WorkspaceUserEntity,
} from '../entities';
import * as normalizeUrl from 'normalize-url';

@EntityRepository(OrderEntity)
export class OrdersRepository extends Repository<OrderEntity> {
  findAllActive(showRecentlyClosed = false) {
    const now = new Date();
    const yesterday = sub(now, { days: 1 });

    return this.findAllWithDetails()
      .where(
        new Brackets((db) => {
          const query = db
            .where(`order.status = '${OrderStatus.InProgress}'`)
            .orWhere(`order.status = '${OrderStatus.Processing}'`)
            .orWhere(`order.status = '${OrderStatus.Ordered}'`);
          if (showRecentlyClosed) {
            query.orWhere(
              `(order.status = '${OrderStatus.Delivered}' AND order.deliveredAt BETWEEN :startDate AND :endDate)`
            );
          }
        })
      )
      .addSelect('SUM(expense.priceCents)', 'order_operation_priceCents')
      .setParameters({
        startDate: yesterday,
        endDate: now,
      });
  }

  findOneWithParticipants(orderId: string) {
    return this.createQueryBuilder('order')
      .where('order.id = :orderId', { orderId })
      .leftJoin(
        'order.expenses',
        'expense',
        'expense.operationId = order.operationId'
      )
      .leftJoinAndMapMany(
        'order.participants',
        WorkspaceUserEntity,
        'participant',
        'expense.workspaceUserId = participant.id'
      )
      .getOne();
  }

  findAllInactive() {
    return this.findAllWithDetails().where(
      new Brackets((db) => {
        db.where(`order.status != '${OrderStatus.InProgress}'`)
          .andWhere(`order.status != '${OrderStatus.Processing}'`)
          .andWhere(`order.status != '${OrderStatus.Ordered}'`);
      })
    );
  }

  findAllWithDetails() {
    return this.createQueryBuilder('order')
      .leftJoinAndMapOne(
        'order.operation',
        OperationEntity,
        'order_operation',
        'order.operationId = order_operation.id'
      )
      .leftJoin(
        'order_operation.expenses',
        'expense',
        'expense.operationId = order.operationId'
      )
      .leftJoin(
        'expense.shares',
        'expense_share',
        'expense.id = expense_share.expenseId'
      )
      .leftJoinAndMapMany(
        'order.participants',
        WorkspaceUserEntity,
        'participant',
        'participant.id = expense_share.workspaceUserId'
      )
      .groupBy('order.id')
      .addGroupBy('participant.id')
      .addGroupBy('order_operation.id');
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    workspace: WorkspaceEntity,
    user: WorkspaceUserEntity
  ) {
    const order = new OrderEntity();
    const operation = new OperationEntity();

    order.operation = operation;
    order.shippingCents = createOrderDto.shippingCents;
    order.menuUrl = createOrderDto.menuUrl
      ? normalizeUrl(createOrderDto.menuUrl, {
          defaultProtocol: 'https://',
        })
      : null;
    order.slug = slugify([order.operation.name, nanoid(6)].join(' '), {
      lower: true,
    });

    order.operation = operation;
    order.operation.name = createOrderDto.name;
    order.operation.workspaceUser = user;
    order.operation.workspace = workspace;

    return this.save(order);
  }

  async updateOrder(createOrderDto: CreateOrderDto, order: OrderEntity) {
    order.slug =
      createOrderDto.name !== order.operation.name
        ? slugify([createOrderDto.name, nanoid(6)].join(' '), { lower: true })
        : order.slug;
    order.operation.name = createOrderDto.name;
    order.shippingCents = createOrderDto.shippingCents;
    order.menuUrl = createOrderDto.menuUrl
      ? normalizeUrl(createOrderDto.menuUrl, {
          defaultProtocol: 'https://',
        })
      : null;

    return this.save(order);
  }

  async markAsOrdered(order: OrderEntity, { shippingCents }: MarkAsOrderedDto) {
    if (order.operation.expenses.length === 0) {
      throw new HttpException('No dishes found', HttpStatus.FORBIDDEN);
    }
    if (shippingCents !== null && shippingCents !== undefined) {
      order.shippingCents = shippingCents;
    }
    order.status = OrderStatus.Ordered;
    order.orderedAt = 'NOW()';

    return await this.save(order);
  }

  async markAsDelivered(
    order: OrderEntity,
    { shippingCents }: MarkAsDeliveredDto
  ) {
    if (shippingCents !== null && shippingCents !== undefined) {
      order.shippingCents = shippingCents;
    }
    order.status = OrderStatus.Delivered;
    order.deliveredAt = 'NOW()';
    order.operation.priceCents = order.operation.expenses.reduce(
      (acc, cur) => acc + cur.priceCents,
      0
    );

    return await this.save(order);
  }

  async markAsProcessing({ id }: OrderEntity) {
    const order = await this.findOneOrFail({
      where: { id },
      relations: [
        'operation',
        'operation.expenses',
        'operation.expenses.shares',
      ],
    });
    if (order.operation.expenses.length === 0) {
      throw new HttpException('No dishes found', HttpStatus.FORBIDDEN);
    }
    const hasMissingShares = order.operation.expenses.some(
      (expense) => expense.shares.length === 0
    );
    if (hasMissingShares) {
      throw new HttpException('Missing shares', HttpStatus.FORBIDDEN);
    }
    order.status = OrderStatus.Processing;
    return await this.save(order);
  }

  async markAsClosed(order: OrderEntity) {
    order.status = OrderStatus.Canceled;
    return await this.save(order);
  }

  async markAsOpen(order: OrderEntity) {
    order.status = OrderStatus.InProgress;
    order.orderedAt = null;
    order.deliveredAt = null;
    return await this.save(order);
  }

  async markAsPaid(order: OrderEntity, payer: UserEntity) {
    return await this.save(order);
  }

  async setETA(order: OrderEntity, eta: number) {
    order.deliveredAt = addMinutes(
      new Date(order.orderedAt),
      eta
    ).toISOString();
    return await this.save(order);
  }
}
