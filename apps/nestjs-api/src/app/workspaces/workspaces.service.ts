import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  UserEntity,
  WorkspaceEntity,
  WorkspacesRepository,
} from '@pasnik/nestjs/database';
import { CreateWorkspaceDto } from '@pasnik/api/data-transfer';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(WorkspacesRepository)
    private workspaceRepository: WorkspacesRepository
  ) {}

  findAll(): Promise<WorkspaceEntity[]> {
    return this.workspaceRepository.find();
  }

  findOne(id: string | number): Promise<WorkspaceEntity> {
    return this.workspaceRepository.findOne(id);
  }

  async create(createWorkspaceDto: CreateWorkspaceDto, user: UserEntity) {
    return this.workspaceRepository.createWorkspace(createWorkspaceDto, user);
  }

  async removeWorkspace(id: string): Promise<void> {
    await this.workspaceRepository.delete(id);
  }
}
