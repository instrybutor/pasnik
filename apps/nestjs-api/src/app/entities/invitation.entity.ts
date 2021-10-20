import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { InvitationModel, InvitationStatus } from '@pasnik/api/data-transfer';

@Entity()
export class InvitationEntity implements InvitationModel {
  @PrimaryColumn()
  email: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ type: 'varchar' })
  status: InvitationStatus;

  @ManyToOne(() => UserEntity, { nullable: true })
  acceptedBy?: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  user?: UserEntity;
}
