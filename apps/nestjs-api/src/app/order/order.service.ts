import { Connection } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

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
  OrderAction,
  SetPayerDto,
  UpdateOrderDto,
} from '@pasnik/api/data-transfer';
import { EventName, OrderStatusChangedEvent } from '../notifications';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private connection: Connection,
    private eventEmitter: EventEmitter2
  ) {}

  findOneById(id: string) {
    return this.ordersRepository.findOneOrFail(
      { id },
      {
        relations: [
          'actions',
          'actions.user',
          'payer',
          'actions.actionUser',
          'workspace',
        ],
      }
    );
  }

  async update(order: OrderEntity, payload: UpdateOrderDto) {
    return await this.ordersRepository.updateOrder(payload, order);
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

      this.dispatchNotification(order);
    });
    return this.findOneById(orderId);
  }

  async markAsProcessing(orderId: string, user: UserEntity) {
    await this.connection.transaction(async (manager) => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(
        OrderActionsRepository
      );

      const order = await ordersRepository.findOneOrFail(orderId, {
        relations: ['dishes'],
      });
      await ordersRepository.markAsProcessing(order);
      await orderActionsRepository.createAction(
        user,
        order,
        OrderAction.Ordered
      );

      this.dispatchNotification(order);
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

      this.dispatchNotification(order);
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

      this.dispatchNotification(order);
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

  async setPayer(orderId: string, { payerId }: SetPayerDto) {
    await this.connection.transaction(async (manager) => {
      const usersRepository = manager.getCustomRepository(UsersRepository);
      const ordersRepository = manager.getCustomRepository(OrdersRepository);

      const payer = await usersRepository.findOneOrFail(payerId);
      const order = await this.findOneById(orderId);

      if (order.payer?.id === payer.id) {
        return;
      }

      await ordersRepository.markAsPaid(order, payer);
    });
    return this.findOneById(orderId);
  }

  private dispatchNotification({ id, from, slug, status }: OrderEntity) {
    const event = new OrderStatusChangedEvent();
    event.data = {
      id,
      from,
      slug,
      status,
    };

    this.eventEmitter.emit(EventName, event);
  }
}
