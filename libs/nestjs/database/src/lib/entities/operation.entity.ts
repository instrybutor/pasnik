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
import { ExpenseEntity } from './expense.entity';
import { PaymentEntity } from './payment.entity';
import { OperationModel } from '@pasnik/api/data-transfer';
import { WorkspaceEntity } from './workspace.entity';

@Entity()
export class OperationEntity implements OperationModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: -1 })
  priceCents: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => WorkspaceUserEntity)
  workspaceUser: WorkspaceUserEntity;

  @Column()
  workspaceUserId: number;

  @ManyToOne(() => WorkspaceEntity)
  workspace: WorkspaceEntity;

  @Column({ nullable: true })
  workspaceId: number;

  @OneToMany(() => ExpenseEntity, ({ operation }) => operation, {
    cascade: true,
    eager: true,
  })
  expenses: ExpenseEntity[];

  @OneToMany(() => PaymentEntity, ({ operation }) => operation, {
    cascade: true,
    eager: true,
  })
  payments: PaymentEntity[];
}
