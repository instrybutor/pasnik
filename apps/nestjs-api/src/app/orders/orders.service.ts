import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from '../repositories/orders.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateOrderDto, MarkAsOrderedDto, OrderAction } from '@pasnik/api/data-transfer';
import { OrderActionsRepository } from '../repositories/order-actions.repository';
import { Connection } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private connection: Connection
  ) {}

  findAll() {
    return this.ordersRepository.find();
  }

  findOne(id: string) {
    return this.ordersRepository.findOne(id, { relations: ['dishes', 'actions', 'actions.user'] });
  }

  async create(createOrderDto: CreateOrderDto, user: UserEntity) {
    return await this.connection.transaction(async manager => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(OrderActionsRepository);

      const order = await ordersRepository.createOrder(createOrderDto, user);
      await orderActionsRepository.createAction(user, order, OrderAction.Created);

      return order;
    });
  }

  async markAsOrdered(orderId: string, markAsOrderedDto: MarkAsOrderedDto, user: UserEntity) {
    await this.connection.transaction(async manager => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(OrderActionsRepository);

      const order = await ordersRepository.findOneOrFail(orderId);
      await ordersRepository.markAsOrdered(order, markAsOrderedDto);
      await orderActionsRepository.createAction(user, order, OrderAction.Ordered);

    });
    return this.findOne(orderId);
  }

  async markAsDelivered(orderId: string, markAsOrderedDto: MarkAsOrderedDto, user: UserEntity) {
    await this.connection.transaction(async manager => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(OrderActionsRepository);

      const order = await ordersRepository.findOneOrFail(orderId);
      await ordersRepository.markAsOrdered(order, markAsOrderedDto);
      await orderActionsRepository.createAction(user, order, OrderAction.Ordered);

    });
    return this.findOne(orderId);
  }

  async markAsClosed(orderId: string, user: UserEntity) {
    await this.connection.transaction(async manager => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(OrderActionsRepository);

      const order = await ordersRepository.findOneOrFail(orderId);
      await ordersRepository.markAsClosed(order);
      await orderActionsRepository.createAction(user, order, OrderAction.Closed);

    });
    return this.findOne(orderId);
  }

  async markAsOpen(orderId: string, user: UserEntity) {
    await this.connection.transaction(async manager => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(OrderActionsRepository);

      const order = await ordersRepository.findOneOrFail(orderId);
      await ordersRepository.markAsOpen(order);
      await orderActionsRepository.createAction(user, order, OrderAction.Open);
    });
    return this.findOne(orderId);
  }
}
