import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto, MarkAsOrderedDto, OrderStatus } from '@pasnik/api/data-transfer';
import { UserEntity } from '../entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(OrderEntity)
export class OrdersRepository extends Repository<OrderEntity> {
  async createOrder(createOrderDto: CreateOrderDto, user: UserEntity) {
    const order = new OrderEntity();

    order.orderedAt = createOrderDto.orderAt;
    order.user = user;
    order.from = createOrderDto.from;
    order.menuUrl = createOrderDto.menuUrl;

    return this.save(order);
  }

  async markAsOrdered(order: OrderEntity, { shippingCents }: MarkAsOrderedDto) {
    if (order.status !== OrderStatus.InProgress) {
      throw new Error('Status is not in progress');
    }
    if (shippingCents !== null && shippingCents !== undefined) {
      order.shippingCents = shippingCents;
    }
    order.status = OrderStatus.Ordered;

    return await this.save(order);
  }

  async markAsDelivered(order: OrderEntity, shippingCents?: number) {
    if (order.status !== OrderStatus.Ordered) {
      throw new Error('Status is not ordered');
    }
    order.shippingCents = shippingCents || order.shippingCents;
    order.status = OrderStatus.Delivered;

    return await this.save(order);
  }

  async markAsClosed(order: OrderEntity) {
    if (order.status !== OrderStatus.InProgress) {
      throw new HttpException('Cannot close this order', HttpStatus.FORBIDDEN);
    }
    order.status = OrderStatus.Closed;
    return await this.save(order);
  }

  async markAsOpen(order: OrderEntity) {
    if (![OrderStatus.Closed, OrderStatus.Ordered].includes(order.status)) {
      throw new HttpException('Cannot open this order', HttpStatus.FORBIDDEN);
    }
    order.status = OrderStatus.InProgress;
    return await this.save(order);
  }
}
