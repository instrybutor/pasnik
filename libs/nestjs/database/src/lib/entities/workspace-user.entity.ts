import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { WorkspaceEntity } from './workspace.entity';
import { UserEntity } from './user.entity';
import {
  WorkspaceUserModel,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';

@Entity()
export class WorkspaceUserEntity implements WorkspaceUserModel {
  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => WorkspaceEntity, { primary: true })
  workspace: WorkspaceEntity;

  @ManyToOne(() => UserEntity, { primary: true })
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  addedBy: UserEntity;

  @Column({ default: WorkspaceUserRole.User })
  role: WorkspaceUserRole;
}
