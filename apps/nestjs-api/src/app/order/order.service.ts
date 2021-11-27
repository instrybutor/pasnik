import { Connection } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import {
  OrderActionsRepository,
  OrderEntity,
  OrdersRepository,
  UserEntity,
  UsersRepository,
} from '@pasnik/nestjs/database';
import {
  MarkAsDeliveredDto,
  MarkAsOrderedDto,
  MarkAsPaidDto,
  OrderAction,
  UpdateOrderDto,
} from '@pasnik/api/data-transfer';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private connection: Connection
  ) {}

  findOneById(id: string) {
    return this.ordersRepository.findOneOrFail(
      { id },
      {
        relations: ['actions', 'actions.user', 'payer', 'actions.actionUser'],
      }
    );
  }

  async update(order: OrderEntity, payload: UpdateOrderDto) {
    return await this.ordersRepository.save({
      ...order,
      ...payload,
    });
  }

  async markAsOrdered(
    orderId: string,
    markAsOrderedDto: MarkAsOrderedDto,
    user: UserEntity
  ) {
    await this.connection.transaction(async (manager) => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(
        OrderActionsRepository
      );

      const order = await ordersRepository.findOneOrFail(orderId, {
        relations: ['dishes'],
      });
      await ordersRepository.markAsOrdered(order, markAsOrderedDto);
      await orderActionsRepository.createAction(
        user,
        order,
        OrderAction.Ordered
      );
    });
    return this.findOneById(orderId);
  }

  async markAsDelivered(
    orderId: string,
    markAsDeliveredDto: MarkAsDeliveredDto,
    user: UserEntity
  ) {
    await this.connection.transaction(async (manager) => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(
        OrderActionsRepository
      );

      const order = await ordersRepository.findOneOrFail(orderId, {
        relations: ['dishes', 'payer'],
      });
      await ordersRepository.markAsDelivered(order, markAsDeliveredDto);
      await orderActionsRepository.createAction(
        user,
        order,
        OrderAction.Delivered
      );
      order.totalPrice = order.dishes.reduce(
        (acc, cur) => acc + cur.priceCents,
        0
      );
      await ordersRepository.save(order);
    });
    return this.findOneById(orderId);
  }

  async markAsClosed(orderId: string, user: UserEntity) {
    await this.connection.transaction(async (manager) => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(
        OrderActionsRepository
      );

      const order = await this.findOneById(orderId);
      await ordersRepository.markAsClosed(order);
      await orderActionsRepository.createAction(
        user,
        order,
        OrderAction.Cancel
      );
    });
    return this.findOneById(orderId);
  }

  async markAsOpen(orderId: string, user: UserEntity) {
    await this.connection.transaction(async (manager) => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(
        OrderActionsRepository
      );

      const order = await this.findOneById(orderId);
      await ordersRepository.markAsOpen(order);
      await orderActionsRepository.createAction(user, order, OrderAction.Open);
    });
    return this.findOneById(orderId);
  }

  async setPayer(
    orderId: string,
    { payerId }: MarkAsPaidDto,
    user: UserEntity
  ) {
    await this.connection.transaction(async (manager) => {
      const usersRepository = manager.getCustomRepository(UsersRepository);
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(
        OrderActionsRepository
      );

      const payer = await usersRepository.findOneOrFail(payerId);
      const order = await this.findOneById(orderId);

      if (order.payer?.id === payer.id) {
        return;
      }

      await ordersRepository.markAsPaid(order, payer);
      await orderActionsRepository.createAction(
        user,
        order,
        OrderAction.Paid,
        payer
      );
    });
    return this.findOneById(orderId);
  }
}
