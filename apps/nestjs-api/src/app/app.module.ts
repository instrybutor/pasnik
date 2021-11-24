import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import {
  NestJsDatabaseModule,
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
import { WorkspaceUserMiddleware } from './workspace-user.middleware';

@Module({
  imports: [
    NestJsCoreModule,
    NestJsDatabaseModule,
    UsersModule,
    OrdersModule,
    DishesModule,
    InvitationsModule,
    WorkspacesModule,

    TypeOrmModule.forFeature([WorkspacesRepository, WorkspaceUsersRepository]),
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
      .apply(WorkspaceUserMiddleware)
      .forRoutes({
        path: '/workspaces/:workspaceId',
        method: RequestMethod.ALL,
      });
  }
}
