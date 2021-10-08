import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersRepository } from '../repositories/orders.repository';
import { UserEntity } from '../entities/user.entity';
import {
  CreateOrderDto,
  MarkAsDeliveredDto,
  MarkAsOrderedDto,
  MarkAsPaidDto,
  OrderAction
} from '@pasnik/api/data-transfer';
import { OrderActionsRepository } from '../repositories/order-actions.repository';
import { Connection } from 'typeorm';
import { UsersRepository } from '../repositories/users.repository';

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
    return this.ordersRepository.findOneOrFail(id, { relations: ['dishes', 'actions', 'actions.user', 'payer', 'actions.actionUser'] });
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

      const order = await this.findOne(orderId);
      await ordersRepository.markAsOrdered(order, markAsOrderedDto);
      await orderActionsRepository.createAction(user, order, OrderAction.Ordered);

    });
    return this.findOne(orderId);
  }

  async markAsDelivered(orderId: string, markAsDeliveredDto: MarkAsDeliveredDto, user: UserEntity) {
    await this.connection.transaction(async manager => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(OrderActionsRepository);

      const order = await this.findOne(orderId);
      await ordersRepository.markAsDelivered(order, markAsDeliveredDto);
      await orderActionsRepository.createAction(user, order, OrderAction.Delivered);
    });
    return this.findOne(orderId);
  }

  async markAsClosed(orderId: string, user: UserEntity) {
    await this.connection.transaction(async manager => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(OrderActionsRepository);

      const order = await this.findOne(orderId);
      await ordersRepository.markAsClosed(order);
      await orderActionsRepository.createAction(user, order, OrderAction.Cancel);

    });
    return this.findOne(orderId);
  }

  async markAsOpen(orderId: string, user: UserEntity) {
    await this.connection.transaction(async manager => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(OrderActionsRepository);

      const order = await this.findOne(orderId);
      await ordersRepository.markAsOpen(order);
      await orderActionsRepository.createAction(user, order, OrderAction.Open);
    });
    return this.findOne(orderId);
  }

  async markAsPaid(orderId: string, { payerId }: MarkAsPaidDto, user: UserEntity) {
    await this.connection.transaction(async manager => {
      const usersRepository = manager.getCustomRepository(UsersRepository);
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(OrderActionsRepository);

      const payer = await usersRepository.findOneOrFail(payerId);
      const order = await this.findOne(orderId);
      await ordersRepository.markAsPaid(order, payer);
      await orderActionsRepository.createAction(user, order, OrderAction.Paid, payer);
    });
    return this.findOne(orderId);
  }
}
