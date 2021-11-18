import { EntityRepository, Repository } from 'typeorm';
import { WorkspaceEntity } from '../entities/workspace.entity';

@EntityRepository(WorkspaceEntity)
export class WorkspaceRepository extends Repository<WorkspaceEntity> {}
