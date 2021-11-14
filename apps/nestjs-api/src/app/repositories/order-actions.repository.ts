import { EntityRepository, Repository } from 'typeorm';
import { OrderAction } from '@pasnik/api/data-transfer';
import {
  OrderActionEntity,
  OrderEntity,
  UserEntity,
} from '@pasnik/nestjs/database';

@EntityRepository(OrderActionEntity)
export class OrderActionsRepository extends Repository<OrderActionEntity> {
  createAction(
    user: UserEntity,
    order: OrderEntity,
    action: OrderAction,
    actionUser?: UserEntity
  ) {
    const orderAction = new OrderActionEntity();

    orderAction.order = order;
    orderAction.user = user;
    orderAction.action = action;
    orderAction.actionUser = actionUser;

    return this.save(orderAction);
  }
}
