import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '@pasnik/api/data-transfer';
import { UserEntity } from '@pasnik/nestjs/database';

@Entity()
export class UserSlackProfileEntity implements UserModel {
  @ManyToOne(() => UserEntity, { nullable: false })
  user: UserEntity;

  @Column({ primary: true })
  slackId: string;

  @Column({ primary: true })
  slackTeamId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
