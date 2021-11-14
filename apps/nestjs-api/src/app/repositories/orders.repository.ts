import { EntityRepository, Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

import { OrderEntity, UserEntity } from '@pasnik/nestjs/database';
import {
  CreateOrderDto,
  MarkAsDeliveredDto,
  MarkAsOrderedDto,
  OrderStatus,
} from '@pasnik/api/data-transfer';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(OrderEntity)
export class OrdersRepository extends Repository<OrderEntity> {
  async createOrder(createOrderDto: CreateOrderDto, user: UserEntity) {
    const order = new OrderEntity();

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
