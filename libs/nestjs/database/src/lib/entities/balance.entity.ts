import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { BalanceModel } from '@pasnik/api/data-transfer';
import { WorkspaceUserEntity } from './workspace-user.entity';

@Entity()
export class BalanceEntity implements BalanceModel {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => WorkspaceUserEntity)
  workspaceUser: WorkspaceUserEntity;

  @Column({ primary: true, unique: true })
  workspaceUserId: number;

  @Column()
  balanceCents: number;
}
