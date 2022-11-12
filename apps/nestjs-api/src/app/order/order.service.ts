import { Connection } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { InjectRepository } from '@nestjs/typeorm';
import {
  OrderActionsRepository,
  OrderEntity,
  OrdersRepository,
  PaymentsRepository,
  UserEntity,
  WorkspaceUserEntity,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';
import {
  AddPayerToOrderDto,
  MarkAsDeliveredDto,
  MarkAsOrderedDto,
  OrderAction,
  SetETADto,
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
        relations: ['actions', 'actions.user', 'actions.actionUser'],
      }
    );
  }

  async update(order: OrderEntity, payload: UpdateOrderDto) {
    await this.ordersRepository.updateOrder(payload, order);
    return await this.findOneById(order.id);
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
        OrderAction.Processing
      );

      this.dispatchNotification(order);
    });
    return this.findOneById(orderId);
  }

  async markAsDelivered(
    orderId: string,
    markAsDeliveredDto: MarkAsDeliveredDto,
    workspaceUser: WorkspaceUserEntity
  ) {
    await this.connection.transaction(async (manager) => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);
      const orderActionsRepository = manager.getCustomRepository(
        OrderActionsRepository
      );
      const order = await ordersRepository.findOneOrFail(orderId, {
        relations: ['dishes'],
      });
      await ordersRepository.markAsDelivered(order, markAsDeliveredDto);
      await orderActionsRepository.createAction(
        workspaceUser.user,
        order,
        OrderAction.Delivered
      );

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

  async setETA(orderId: string, { eta }: SetETADto) {
    await this.connection.transaction(async (manager) => {
      const ordersRepository = manager.getCustomRepository(OrdersRepository);

      const order = await this.findOneById(orderId);

      await ordersRepository.setETA(order, eta);
    });
    return this.findOneById(orderId);
  }

  async addPayerToOrder(
    order: OrderEntity,
    workspaceUser: WorkspaceUserEntity,
    addPayerDto: AddPayerToOrderDto
  ) {
    await this.connection.transaction(async (manager) => {
      const paymentsRepository =
        manager.getCustomRepository(PaymentsRepository);
      const workspaceUserRepository = manager.getCustomRepository(
        WorkspaceUsersRepository
      );

      const payer = await workspaceUserRepository.findOneOrFail({
        where: {
          id: addPayerDto.workspaceUserId,
          workspaceId: order.operation.workspaceId,
        },
      });

      if (addPayerDto.amountCents === 0) {
        return await paymentsRepository.delete({
          operation: order.operation,
          workspaceUser: payer,
        });
      }

      const { id } = await paymentsRepository.upsertPayment(
        payer.id,
        addPayerDto.amountCents,
        order.operation
      );

      return await paymentsRepository.findOne({ where: { id } });
    });
  }

  private dispatchNotification({ id, operation, slug, status }: OrderEntity) {
    const event = new OrderStatusChangedEvent();
    event.data = {
      id,
      from: operation.name,
      slug,
      status,
    };

    this.eventEmitter.emit(EventName, event);
  }
}
