import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto, MarkAsOrderedDto, OrderStatus } from '@pasnik/api/data-transfer';
import { UserEntity } from '../entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MarkAsDeliveredDto } from '../../../../../libs/api/data-transfer/src/lib/mark-as-delivered.dto';

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
      throw new HttpException('Status is not in progress', HttpStatus.FORBIDDEN);
    }
    if (shippingCents !== null && shippingCents !== undefined) {
      order.shippingCents = shippingCents;
    }
    order.status = OrderStatus.Ordered;

    return await this.save(order);
  }

  async markAsDelivered(order: OrderEntity, { shippingCents }: MarkAsDeliveredDto) {
    if (order.status !== OrderStatus.Ordered) {
      throw new HttpException('Status is not ordered', HttpStatus.FORBIDDEN);
    }
    if (shippingCents !== null && shippingCents !== undefined) {
      order.shippingCents = shippingCents;
    }
    order.status = OrderStatus.Delivered;

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
    return await this.save(order);
  }

  async markAsPaid(order: OrderEntity, payer: UserEntity) {
    if (![OrderStatus.Ordered].includes(order.status) || !!order.payer) {
      throw new HttpException('Cannot mark as paid', HttpStatus.FORBIDDEN);
    }
    order.payer = payer;
    return await this.save(order);
  }
}
