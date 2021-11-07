import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PaymentModel } from '@pasnik/api/data-transfer';

@Entity()
export class PaymentEntity implements PaymentModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  payer: UserEntity;

  @Column()
  balanceCents: number;
}
