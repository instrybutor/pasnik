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
import { UserEntity } from './user.entity';
import { WorkspaceEntity } from './workspace.entity';

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

  @Column()
  userId: number;

  @Column({ type: 'varchar' })
  status: WorkspaceAccessRequestStatus;
}
