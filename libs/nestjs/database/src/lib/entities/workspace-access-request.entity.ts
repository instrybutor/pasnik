import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  WorkspaceAccessRequestModel,
  WorkspaceAccessRequestStatus,
} from '@pasnik/api/data-transfer';
import { UserEntity, WorkspaceEntity } from '@pasnik/nestjs/database';

@Entity()
export class WorkspaceAccessRequestEntity
  implements WorkspaceAccessRequestModel
{
  readonly kind = 'WorkspaceAccessRequestModel';

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => WorkspaceEntity)
  workspace: WorkspaceEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({ type: 'varchar' })
  status: WorkspaceAccessRequestStatus;
}
