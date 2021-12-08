import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkspaceEntity } from './workspace.entity';
import { UserEntity } from './user.entity';
import {
  WorkspaceUserModel,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';

@Entity()
export class WorkspaceUserEntity implements WorkspaceUserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => WorkspaceEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  workspace: WorkspaceEntity;

  @Column({ unique: true })
  workspaceId: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: UserEntity;

  @Column({ unique: true })
  userId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  addedBy: UserEntity;

  @Column({ type: 'varchar', default: WorkspaceUserRole.User })
  role: WorkspaceUserRole;

  @Column({ default: false })
  isRemoved: boolean;
}
