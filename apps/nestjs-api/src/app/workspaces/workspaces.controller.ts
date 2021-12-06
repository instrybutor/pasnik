import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { WorkspacesService } from './workspaces.service';
import {
  AddMemberToWorkspaceDto,
  CreateOrderDto,
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';
import { CurrentUser } from '@pasnik/nestjs/auth';
import {
  UserEntity,
  WorkspaceEntity,
  WorkspaceUserEntity,
} from '@pasnik/nestjs/database';
import { CurrentWorkspace } from './current-workspace.decorator';
import { CurrentWorkspaceUser } from '../current-workspace-user.decorator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  findAllWorkspacesForCurrentUser(@CurrentUser() user: UserEntity) {
    return this.workspacesService.findAllForUser(user);
  }

  @Get(':workspaceSlug')
  findOne(@CurrentWorkspace() workspace: WorkspaceEntity) {
    return workspace;
  }

  @Post()
  createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.workspacesService.create(createWorkspaceDto, user);
  }

  @Put(':workspaceSlug')
  updateWorkspace(
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
    @CurrentWorkspaceUser() user: WorkspaceUserEntity
  ) {
    return this.workspacesService.update(workspace, updateWorkspaceDto, user);
  }

  @Delete(':workspaceSlug')
  removeWorkspace(@CurrentWorkspace() workspace: WorkspaceEntity) {
    return this.workspacesService.removeWorkspace(workspace);
  }

  @Put(':workspaceSlug/join')
  joinWorkspace(
    @CurrentUser() user: UserEntity,
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentWorkspaceUser() workspaceUser?: WorkspaceUserEntity
  ) {
    if (workspaceUser?.isRemoved === false) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.workspacesService.addMember(workspace, user.email);
  }

  @Put(':workspaceSlug/leave')
  leaveWorkspace(@CurrentWorkspaceUser() workspaceUser: WorkspaceUserEntity) {
    if (workspaceUser.role === WorkspaceUserRole.Owner) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.workspacesService.removeMember(
      workspaceUser.workspace,
      workspaceUser.userId
    );
  }

  // Orders

  @Post(':workspaceSlug/orders')
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentWorkspaceUser() workspaceUser: WorkspaceUserEntity
  ) {
    return this.workspacesService.createOrder(createOrderDto, workspaceUser);
  }

  @Get(':workspaceSlug/orders/active')
  findActiveOrders(@CurrentWorkspace() workspace: WorkspaceEntity) {
    return this.workspacesService.findActiveOrders(workspace);
  }

  @Get(':workspaceSlug/orders/inactive')
  findInactiveOrders(@CurrentWorkspace() workspace: WorkspaceEntity) {
    return this.workspacesService.findInactiveOrders(workspace);
  }

  // Users

  @Get(':workspaceSlug/users')
  findUsers(@CurrentWorkspace() workspace: WorkspaceEntity) {
    return this.workspacesService.findUsers(workspace);
  }

  @Put(':workspaceSlug/users')
  addMemberToWorkspace(
    @Body() { email }: AddMemberToWorkspaceDto,
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentWorkspaceUser() workspaceUser: WorkspaceUserEntity
  ) {
    if (workspaceUser.role === WorkspaceUserRole.User) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.workspacesService.addMember(workspace, email);
  }

  @Delete(':workspaceSlug/users/:userId')
  removeMemberFromWorkspace(
    @Param('userId') userId: string,
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentWorkspaceUser() workspaceUser: WorkspaceUserEntity
  ) {
    if (workspaceUser.role === WorkspaceUserRole.User) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.workspacesService.removeMember(workspace, +userId);
  }
}
