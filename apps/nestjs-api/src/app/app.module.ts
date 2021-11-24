import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import {
  NestJsDatabaseModule,
  OrdersRepository,
  WorkspacesRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';
import { NestJsCoreModule } from '@pasnik/nestjs/core';

import { UsersModule } from './users';
import { OrdersModule } from './orders';
import { DishesModule } from './dishes';
import { InvitationsModule } from './invitations';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthJwtMiddleware } from './auth-jwt.middleware';
import { OrdersMiddleware } from './orders/orders.middleware';
import { WorkspacesMiddleware } from './workspaces/workspaces.middleware';

@Module({
  imports: [
    NestJsCoreModule,
    NestJsDatabaseModule,
    UsersModule,
    OrdersModule,
    DishesModule,
    InvitationsModule,
    WorkspacesModule,

    TypeOrmModule.forFeature([
      WorkspacesRepository,
      WorkspaceUsersRepository,
      OrdersRepository,
    ]),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthJwtMiddleware)
      .forRoutes({
        path: '/**',
        method: RequestMethod.ALL,
      })
      .apply(WorkspacesMiddleware)
      .forRoutes('/workspaces/:workspaceId', '/workspaces/:workspaceId/**')
      .apply(OrdersMiddleware)
      .forRoutes('/orders/:slug', '/orders/:slug/**');
  }
}
