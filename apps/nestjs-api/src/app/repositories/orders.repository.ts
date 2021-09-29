import { EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderDto, OrderStatus } from '@pasnik/api/data-transfer';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(OrderEntity)
export class OrdersRepository extends Repository<OrderEntity> {
  async createOrder(createOrderDto: CreateOrderDto, user: UserEntity) {
    const order = new OrderEntity();

    order.orderedAt = createOrderDto.orderAt;
    order.user = user;
    order.from = createOrderDto.from;
    order.menuUrl = createOrderDto.menuUrl;
    order.shippingCents = createOrderDto.shippingCents || 0;

    await this.save(order);

    const saved = await this.findOneOrFail(order.id, { relations: ['dishes'] });

    return saved;
  }

  async markAsOrdered(order: OrderEntity, shippingCents?: number) {
    if (order.status !== OrderStatus.InProgress) {
      throw new Error('Status is not in progress');
    }
    order.shippingCents = shippingCents || order.shippingCents;
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
}
