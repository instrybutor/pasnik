import { EntityRepository, Repository } from 'typeorm';
import { WorkspaceUserEntity } from '../entities/workspace-user.entity';
import { UserEntity, WorkspaceEntity } from '../entities';
import { WorkspaceUserRole } from '@pasnik/api/data-transfer';

@EntityRepository(WorkspaceUserEntity)
export class WorkspaceUsersRepository extends Repository<WorkspaceUserEntity> {
  async addMember(workspace: WorkspaceEntity, user: UserEntity) {
    const workspaceUser =
      (await this.findOne({ where: { workspace, user } })) ??
      new WorkspaceUserEntity();

    workspaceUser.workspace = workspace;
    workspaceUser.user = user;
    workspaceUser.role = WorkspaceUserRole.User;
    workspaceUser.isRemoved = false;

    return this.save(workspaceUser);
  }

  async removeMember(workspaceUser: WorkspaceUserEntity) {
    workspaceUser.isRemoved = true;

    return this.save(workspaceUser);
  }
}
