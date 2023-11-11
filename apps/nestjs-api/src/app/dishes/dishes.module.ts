import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  DishesRepository,
  ExpensesRepository,
  OrdersRepository,
  UsersRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';

import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { OrderMiddleware } from '../order/order.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      DishesRepository,
      UsersRepository,
      WorkspaceUsersRepository,
      ExpensesRepository,
    ]),
  ],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OrderMiddleware).forRoutes(DishesController);
  }
}
