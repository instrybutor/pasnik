import { EntityRepository, Repository } from 'typeorm';
import { WorkspaceAccessRequestEntity } from '../entities/workspace-access-request.entity';

@EntityRepository(WorkspaceAccessRequestEntity)
export class WorkspaceAccessRequestsRepository extends Repository<WorkspaceAccessRequestEntity> {}
