import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  NotificationModel,
  NotificationAction,
} from '@pasnik/api/data-transfer';

import { UserEntity } from './user.entity';

@Entity()
export class NotificationEntity implements NotificationModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @Column({ type: 'text' })
  action: NotificationAction;

  @Column({ type: 'jsonb', nullable: true })
  data?: unknown;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
