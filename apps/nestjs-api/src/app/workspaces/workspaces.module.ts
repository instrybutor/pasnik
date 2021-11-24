import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  OrdersRepository,
  WorkspacesRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';

import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkspacesRepository,
      WorkspaceUsersRepository,
      OrdersRepository,
    ]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
  exports: [WorkspacesService],
})
export class WorkspacesModule {}
