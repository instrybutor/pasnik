import { EntityRepository, Repository } from 'typeorm';
import { WorkspaceEntity } from '../entities/workspace.entity';
import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
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
    workspaceUser.role = WorkspaceUserRole.Owner;
    workspaceUser.addedBy = user;

    workspace.name = createWorkspaceDto.name;
    workspace.workspaceUsers = [workspaceUser];
    workspace.privacy = createWorkspaceDto.privacy;
    workspace.slug = slugify([workspace.name, nanoid(6)].join(' '), {
      lower: true,
    });

    return this.save(workspace);
  }

  async updateWorkspace(
    { id }: WorkspaceEntity,
    updateWorkspaceDto: UpdateWorkspaceDto
  ) {
    const workspace = await this.findOneOrFail(id);
    if (updateWorkspaceDto && updateWorkspaceDto.name !== workspace.name) {
      workspace.slug = slugify([updateWorkspaceDto.name, nanoid(6)].join(' '), {
        lower: true,
      });
    }
    workspace.name = updateWorkspaceDto.name ?? workspace.name;
    workspace.privacy = updateWorkspaceDto.privacy ?? workspace.privacy;

    return this.save(workspace);
  }
}
