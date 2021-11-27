import { EntityRepository, Repository } from 'typeorm';
import { WorkspaceEntity } from '../entities/workspace.entity';
import {
  CreateWorkspaceDto,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';
import { UserEntity, WorkspaceUserEntity } from '../entities';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

@EntityRepository(WorkspaceEntity)
export class WorkspacesRepository extends Repository<WorkspaceEntity> {
  async createWorkspace(
    createWorkspaceDto: CreateWorkspaceDto,
    user: UserEntity
  ) {
    const workspace = new WorkspaceEntity();
    const workspaceUser = new WorkspaceUserEntity();
    workspaceUser.user = user;
    workspaceUser.role = WorkspaceUserRole.Admin;
    workspaceUser.addedBy = user;

    workspace.name = createWorkspaceDto.name;
    workspace.workspaceUsers = [workspaceUser];
    workspace.privacy = createWorkspaceDto.privacy;
    workspace.slug = slugify([workspace.name, nanoid(6)].join(' '), {
      lower: true,
    });

    return this.save(workspace);
  }
}
