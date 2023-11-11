import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentModel } from '@pasnik/api/data-transfer';
import { WorkspaceUserEntity } from './workspace-user.entity';
import { OperationEntity } from './operation.entity';

@Entity()
export class PaymentEntity implements PaymentModel {
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
  amountCents: number;

  @ManyToOne(() => OperationEntity, (operation) => operation.payments)
  operation: OperationEntity;

  @Column()
  operationId: number;
}
