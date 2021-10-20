import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({ nullable: true })
  acceptedBy?: UserEntity;

  @Column({ nullable: true })
  user?: UserEntity;
}
