import { EntityRepository, Repository } from 'typeorm';
import { OperationEntity, WorkspaceUserEntity } from '../entities';

@EntityRepository(OperationEntity)
export class OperationsRepository extends Repository<OperationEntity> {
  async createOperation(
    name: string,
    workspaceUserEntity: WorkspaceUserEntity
  ) {
    const operationEntity = new OperationEntity();

    operationEntity.workspaceUser = workspaceUserEntity;
    operationEntity.workspaceId = workspaceUserEntity.workspaceId;
    operationEntity.name = name;

    return await this.save(operationEntity);
  }
}
