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
import { sub } from 'date-fns';
import { OrderEntity, UserEntity, WorkspaceEntity } from '../entities';

@EntityRepository(OrderEntity)
export class OrdersRepository extends Repository<OrderEntity> {
  findAllActive(showRecentlyClosed = false) {
    const now = new Date();
    const yesterday = sub(now, { days: 1 });

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
      .where(
        new Brackets((db) => {
          const query = db
            .where(`order.status = '${OrderStatus.InProgress}'`)
            .orWhere(`order.status = '${OrderStatus.Ordered}'`);
          if (showRecentlyClosed) {
            query.orWhere(
              `(order.status = '${OrderStatus.Delivered}' AND order.deliveredAt BETWEEN :startDate AND :endDate)`
            );
          }
        })
      )
      .addSelect('SUM(dish.priceCents)', 'order_totalPrice')
      .groupBy('order.id')
      .addGroupBy('user.id')
      .addGroupBy('participant.id')
      .addGroupBy('workspace.id')
      .setParameters({
        startDate: yesterday,
        endDate: now,
      });
  }

  findAllInactive() {
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
      .where(
        `order.status != '${OrderStatus.InProgress}' AND order.status != '${OrderStatus.Ordered}'`
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
    order.menuUrl = createOrderDto.menuUrl;
    order.slug = slugify([order.from, nanoid(6)].join(' '), { lower: true });
    order.payer = user;

    return this.save(order);
  }

  async markAsOrdered(order: OrderEntity, { shippingCents }: MarkAsOrderedDto) {
    if (order.status !== OrderStatus.InProgress) {
      throw new HttpException(
        'Status is not in progress',
        HttpStatus.FORBIDDEN
      );
    }
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
    if (order.status !== OrderStatus.Ordered) {
      throw new HttpException('Status is not ordered', HttpStatus.FORBIDDEN);
    }
    if (!order.payer) {
      throw new HttpException('Payer not selected', HttpStatus.FORBIDDEN);
    }
    if (shippingCents !== null && shippingCents !== undefined) {
      order.shippingCents = shippingCents;
    }
    order.status = OrderStatus.Delivered;
    order.deliveredAt = 'NOW()';

    return await this.save(order);
  }

  async markAsClosed(order: OrderEntity) {
    if (order.status !== OrderStatus.InProgress) {
      throw new HttpException('Cannot close this order', HttpStatus.FORBIDDEN);
    }
    order.status = OrderStatus.Canceled;
    return await this.save(order);
  }

  async markAsOpen(order: OrderEntity) {
    if (![OrderStatus.Canceled, OrderStatus.Ordered].includes(order.status)) {
      throw new HttpException('Cannot open this order', HttpStatus.FORBIDDEN);
    }
    order.status = OrderStatus.InProgress;
    order.orderedAt = null;
    return await this.save(order);
  }

  async markAsPaid(order: OrderEntity, payer: UserEntity) {
    if ([OrderStatus.Delivered].includes(order.status)) {
      throw new HttpException('Cannot mark as paid', HttpStatus.FORBIDDEN);
    }
    order.payer = payer;
    return await this.save(order);
  }
}
