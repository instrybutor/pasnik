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
  AddMembersToWorkspaceDto,
  CreateOrderDto,
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspacePrivacy,
} from '@pasnik/api/data-transfer';
import { CurrentUser } from '@pasnik/nestjs/auth';
import {
  UserEntity,
  WorkspaceEntity,
  WorkspaceUserEntity,
} from '@pasnik/nestjs/database';
import { CurrentWorkspace } from './current-workspace.decorator';
import {
  AppAbility,
  WorkspacesAction,
  WorkspaceUsersAction,
} from '@pasnik/ability';
import { ForbiddenError } from '@casl/ability';
import { CurrentAbility } from '../app-ability';
import { CurrentWorkspaceUser } from './current-workspace-user.decorator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  findAllWorkspacesForCurrentUser(@CurrentUser() user: UserEntity) {
    return this.workspacesService.findAllForUser(user);
  }

  @Get(':workspaceSlug')
  async findOne(
    @CurrentWorkspaceUser() workspaceUser: WorkspaceUserEntity,
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility,
    @CurrentUser() user: UserEntity
  ) {
    if (workspaceUser) {
      ForbiddenError.from(ability).throwUnlessCan(
        WorkspacesAction.Read,
        workspace
      );
      return workspace;
    } else if (workspace.privacy === WorkspacePrivacy.Public) {
      return workspace;
    }
    const accessRequest = await this.workspacesService.findAccessRequest(
      workspace,
      user
    );
    if (accessRequest) {
      throw new HttpException('Pending', HttpStatus.FOUND);
    }
    throw new HttpException('Not invited', HttpStatus.FORBIDDEN);
  }

  @Post()
  createWorkspace(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @CurrentUser() user: UserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.Create,
      'WorkspaceModel'
    );
    return this.workspacesService.create(createWorkspaceDto, user);
  }

  @Put(':workspaceSlug')
  updateWorkspace(
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.Update,
      workspace
    );

    return this.workspacesService.update(workspace, updateWorkspaceDto);
  }

  @Delete(':workspaceSlug')
  removeWorkspace(
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.Delete,
      workspace
    );
    return this.workspacesService.removeWorkspace(workspace);
  }

  @Put(':workspaceSlug/join')
  joinWorkspace(
    @CurrentUser() user: UserEntity,
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.Join,
      workspace
    );
    return this.workspacesService.joinWorkspace(workspace, user);
  }

  @Get(':workspaceSlug/access-requests')
  accessRequests(
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.ApproveAccess,
      workspace
    );
    return this.workspacesService.findAccessRequests(workspace);
  }

  @Put(':workspaceSlug/request-access')
  requestAccess(
    @CurrentUser() user: UserEntity,
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.RequestAccess,
      workspace
    );
    return this.workspacesService.requestAccess(workspace, user);
  }

  @Put(':workspaceSlug/leave')
  leaveWorkspace(
    @CurrentWorkspaceUser() workspaceUser: WorkspaceUserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.Leave,
      workspaceUser.workspace
    );
    return this.workspacesService.removeMember(workspaceUser);
  }

  // Orders

  @Post(':workspaceSlug/orders')
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentWorkspaceUser() workspaceUser: WorkspaceUserEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.CreateOrder,
      workspaceUser?.workspace
    );
    return this.workspacesService.createOrder(createOrderDto, workspaceUser);
  }

  @Get(':workspaceSlug/orders/active')
  findActiveOrders(
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.Read,
      workspace
    );
    return this.workspacesService.findActiveOrders(workspace);
  }

  @Get(':workspaceSlug/orders/inactive')
  findInactiveOrders(
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.Read,
      workspace
    );
    return this.workspacesService.findInactiveOrders(workspace);
  }

  // WorkspaceUsers

  @Get(':workspaceSlug/users')
  findUsers(
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspacesAction.Read,
      workspace
    );
    return this.workspacesService.findUsers(workspace);
  }

  @Put(':workspaceSlug/users')
  addMembersToWorkspace(
    @Body() addMembersToWorkspaceDto: AddMembersToWorkspaceDto,
    @CurrentWorkspace() workspace: WorkspaceEntity,
    @CurrentAbility() ability: AppAbility
  ) {
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspaceUsersAction.Create,
      'WorkspaceUserModel'
    );
    return this.workspacesService.addMembers(
      workspace,
      addMembersToWorkspaceDto
    );
  }

  @Delete(':workspaceSlug/users/:id')
  async removeMemberFromWorkspace(
    @Param(':id') workspaceUserId: string,
    @CurrentAbility() ability: AppAbility
  ) {
    const workspaceUser = await this.workspacesService.findUserById(
      workspaceUserId
    );
    ForbiddenError.from(ability).throwUnlessCan(
      WorkspaceUsersAction.Delete,
      workspaceUser
    );
    return this.workspacesService.removeMember(workspaceUser);
  }
}
