import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DishEntity,
  OrderActionEntity,
  OrdersRepository,
  UsersRepository,
  WorkspacesRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderMiddleware } from './order.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      OrderActionEntity,
      DishEntity,
      UsersRepository,
      WorkspacesRepository,
      WorkspaceUsersRepository,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OrderMiddleware)
      .exclude('/orders/active')
      .forRoutes(OrderController);
  }
}
