import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkspaceUserEntity } from './workspace-user.entity';
import { ExpenseModel } from '@pasnik/api/data-transfer';
import { OperationEntity } from './operation.entity';
import { ShareEntity } from './share.entity';

@Entity()
export class ExpenseEntity implements ExpenseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => WorkspaceUserEntity)
  workspaceUser: WorkspaceUserEntity;

  @Column()
  workspaceUserId: number;

  @Column()
  priceCents: number;

  @OneToMany(() => ShareEntity, (share) => share.expense, {
    cascade: true,
    eager: true,
  })
  shares: ShareEntity[];

  @ManyToOne(() => OperationEntity)
  operation: OperationEntity;

  @Column()
  operationId: number;
}
