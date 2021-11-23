import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  WorkspacesRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';

import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkspacesRepository, WorkspaceUsersRepository]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
  exports: [WorkspacesService],
})
export class WorkspacesModule {}
