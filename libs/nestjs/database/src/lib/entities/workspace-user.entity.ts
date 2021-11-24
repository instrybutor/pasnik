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

  @ManyToOne(() => WorkspaceEntity, {
    primary: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  workspace: WorkspaceEntity;

  @Column()
  workspaceId: number;

  @ManyToOne(() => UserEntity, {
    primary: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: UserEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  addedBy: UserEntity;

  @Column({ type: 'varchar', default: WorkspaceUserRole.User })
  role: WorkspaceUserRole;
}
