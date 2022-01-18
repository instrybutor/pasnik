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
  OrderStatusChangedDto,
} from '@pasnik/api/data-transfer';

import { UserEntity } from './user.entity';

@Entity()
export class NotificationEntity implements NotificationModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'text' })
  action: NotificationAction;

  @Column({ type: 'jsonb', nullable: true })
  data?: OrderStatusChangedDto;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
