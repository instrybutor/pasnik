import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import {
  NestJsDatabaseModule,
  OrdersRepository,
  WorkspacesRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';
import { NestJsCoreModule } from '@pasnik/nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { UsersModule } from './users';
import { OrdersModule } from './orders';
import { DishesModule } from './dishes';
import { InvitationsModule } from './invitations';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { AuthJwtMiddleware } from './auth-jwt.middleware';
import { WorkspacesMiddleware } from './workspaces/workspaces.middleware';
import { OrderModule } from './order';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    NestJsCoreModule,
    NestJsDatabaseModule,
    UsersModule,
    OrdersModule,
    OrderModule,
    DishesModule,
    InvitationsModule,
    WorkspacesModule,
    NotificationsModule,
    EventEmitterModule.forRoot(),

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
      .forRoutes('/workspaces/:workspaceSlug', '/workspaces/:workspaceSlug/**');
  }
}
