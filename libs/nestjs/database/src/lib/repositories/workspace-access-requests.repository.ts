import { EntityRepository, Repository } from 'typeorm';
import { WorkspaceAccessRequestEntity } from '../entities/workspace-access-request.entity';
import { UserEntity, WorkspaceEntity } from '../entities';
import { WorkspaceAccessRequestStatus } from '@pasnik/api/data-transfer';

@EntityRepository(WorkspaceAccessRequestEntity)
export class WorkspaceAccessRequestsRepository extends Repository<WorkspaceAccessRequestEntity> {
  async createAccessRequest(workspace: WorkspaceEntity, user: UserEntity) {
    const accessRequest = new WorkspaceAccessRequestEntity();

    accessRequest.workspace = workspace;
    accessRequest.user = user;
    accessRequest.status = WorkspaceAccessRequestStatus.Requested;

    return this.save(accessRequest);
  }
}
