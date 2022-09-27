import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkspaceUserEntity } from './workspace-user.entity';
import { ShareModel, ShareType } from '@pasnik/api/data-transfer';
import { ExpenseEntity } from './expense.entity';

@Entity()
export class ShareEntity implements ShareModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => WorkspaceUserEntity)
  workspaceUser: WorkspaceUserEntity;

  @Column()
  workspaceUserId: number;

  @Column()
  share: number;

  @Column({ type: 'varchar' })
  shareType: ShareType;

  @ManyToOne(() => ExpenseEntity, (expense) => expense.shares, {
    onDelete: 'CASCADE',
  })
  expense: ExpenseEntity;
}
