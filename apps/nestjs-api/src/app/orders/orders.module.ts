import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DishEntity,
  OrderActionEntity,
  OrdersRepository,
  UsersRepository,
  WorkspacesRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersMiddleware } from './orders.middleware';

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
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OrdersMiddleware).forRoutes({
      path: '/orders/:slug',
      method: RequestMethod.ALL,
    });
  }
}
