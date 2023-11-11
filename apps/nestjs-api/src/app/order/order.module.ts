import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DishEntity,
  OperationsRepository,
  OrderActionEntity,
  OrdersRepository,
  PaymentsRepository,
  SharesRepository,
  UsersRepository,
  WorkspacesRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderMiddleware } from './order.middleware';
import { PaymentsService } from '../payments/payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      OrderActionEntity,
      DishEntity,
      UsersRepository,
      WorkspacesRepository,
      WorkspaceUsersRepository,
      PaymentsRepository,
      SharesRepository,
      OperationsRepository,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, PaymentsService],
})
export class OrderModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OrderMiddleware)
      .exclude('/orders/active')
      .forRoutes(OrderController);
  }
}
