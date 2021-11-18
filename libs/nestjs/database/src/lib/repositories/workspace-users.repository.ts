import { EntityRepository, Repository } from 'typeorm';
import { WorkspaceUserEntity } from '../entities/workspace-user.entity';

@EntityRepository(WorkspaceUserEntity)
export class WorkspaceUserRepository extends Repository<WorkspaceUserEntity> {}
