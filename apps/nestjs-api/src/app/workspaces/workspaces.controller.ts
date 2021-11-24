import { Body, Controller, Get, Post } from '@nestjs/common';

import { WorkspacesService } from './workspaces.service';
import { CreateOrderDto, CreateWorkspaceDto } from '@pasnik/api/data-transfer';
import { CurrentUser } from '@pasnik/nestjs/auth';
import {
  UserEntity,
  WorkspaceEntity,
  WorkspaceUserEntity,
} from '@pasnik/nestjs/database';
import { CurrentWorkspace } from '../current-workspace.decorator';
import { CurrentWorkspaceUser } from '../current-workspace-user.decorator';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post(':workspaceId/orders')
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentWorkspaceUser() workspaceUser: WorkspaceUserEntity
  ) {
    return this.workspacesService.createOrder(createOrderDto, workspaceUser);
  }

  @Get(':workspaceId/orders/active')
  findActiveOrders(@CurrentWorkspace() workspace: WorkspaceEntity) {
    return this.workspacesService.findActiveOrders(workspace);
  }

  @Get(':workspaceId/orders/inactive')
  findInactiveOrders(@CurrentWorkspace() workspace: WorkspaceEntity) {
    return this.workspacesService.findInactiveOrders(workspace);
  }

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Post()
  create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.workspacesService.create(createWorkspaceDto, user);
  }
}
