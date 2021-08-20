import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

export enum TransferStatus {
  Pending,
  Accepted,
  Rejected,
}

@Entity()
export class TransferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity)
  from: UserEntity;

  @ManyToOne(() => UserEntity)
  to: UserEntity;

  @Column()
  amountCents: number;

  @Column({ default: TransferStatus.Pending })
  status: TransferStatus;
}
