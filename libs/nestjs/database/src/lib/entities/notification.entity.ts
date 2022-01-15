import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationModel } from '@pasnik/api/data-transfer';

import { UserEntity } from './user.entity';

@Entity()
export class NotificationEntity implements NotificationModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];
}
