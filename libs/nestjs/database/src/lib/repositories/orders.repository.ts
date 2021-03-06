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
import { OrderEntity, UserEntity, WorkspaceEntity } from '../entities';
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
      .addSelect('SUM(dish.priceCents)', 'order_totalPrice')
      .setParameters({
        startDate: yesterday,
        endDate: now,
      });
  }

  findOneWithParticipants(orderId: string) {
    return this.createQueryBuilder('order')
      .where('order.id = :orderId', { orderId })
      .leftJoin('order.dishes', 'dish', 'dish.orderId = order.id')
      .leftJoinAndMapMany(
        'order.participants',
        UserEntity,
        'participant',
        'dish.userId = participant.id'
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
      .leftJoin('order.dishes', 'dish', 'dish.orderId = order.id')
      .leftJoinAndMapOne(
        'order.workspace',
        WorkspaceEntity,
        'workspace',
        'workspace.id = order.workspaceId'
      )
      .leftJoinAndMapOne(
        'order.user',
        UserEntity,
        'user',
        'user.id = order.userId'
      )
      .leftJoinAndMapMany(
        'order.participants',
        UserEntity,
        'participant',
        'dish.userId = participant.id'
      )
      .groupBy('order.id')
      .addGroupBy('user.id')
      .addGroupBy('participant.id')
      .addGroupBy('workspace.id');
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    workspace: WorkspaceEntity,
    user: UserEntity
  ) {
    const order = new OrderEntity();

    order.workspace = workspace;
    order.user = user;
    order.from = createOrderDto.from;
    order.shippingCents = createOrderDto.shippingCents;
    console.log(createOrderDto.menuUrl);
    order.menuUrl = createOrderDto.menuUrl
      ? normalizeUrl(createOrderDto.menuUrl, {
          defaultProtocol: 'https://',
        })
      : null;
    order.slug = slugify([order.from, nanoid(6)].join(' '), { lower: true });
    order.payer = user;

    return this.save(order);
  }

  async updateOrder(createOrderDto: CreateOrderDto, order: OrderEntity) {
    order.slug =
      createOrderDto.from !== order.from
        ? slugify([createOrderDto.from, nanoid(6)].join(' '), { lower: true })
        : order.slug;
    order.from = createOrderDto.from;
    order.shippingCents = createOrderDto.shippingCents;
    order.menuUrl = createOrderDto.menuUrl
      ? normalizeUrl(createOrderDto.menuUrl, {
          defaultProtocol: 'https://',
        })
      : null;

    return this.save(order);
  }

  async markAsOrdered(order: OrderEntity, { shippingCents }: MarkAsOrderedDto) {
    if (order.dishes.length === 0) {
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
    order.totalPrice = order.dishes.reduce(
      (acc, cur) => acc + cur.priceCents,
      0
    );

    return await this.save(order);
  }

  async markAsProcessing(order: OrderEntity) {
    if (order.dishes.length === 0) {
      throw new HttpException('No dishes found', HttpStatus.FORBIDDEN);
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
    order.payer = payer;
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
