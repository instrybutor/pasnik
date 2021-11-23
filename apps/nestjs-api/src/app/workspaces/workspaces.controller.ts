import { Body, Controller, Get, Post } from '@nestjs/common';

import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from '@pasnik/api/data-transfer';
import { CurrentUser } from '@pasnik/nestjs/auth';
import { UserEntity } from '@pasnik/nestjs/database';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

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
