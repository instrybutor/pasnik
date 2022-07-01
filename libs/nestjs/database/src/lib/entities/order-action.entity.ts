import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderAction, OrderActionModel } from '@pasnik/api/data-transfer';
import { OrderEntity } from './order.entity';

@Entity({
  orderBy: {
    createdAt: 'ASC',
  },
})
export class OrderActionEntity implements OrderActionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  user: UserEntity;

  @ManyToOne(() => OrderEntity, { onDelete: 'CASCADE' })
  order: OrderEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  actionUser?: UserEntity;

  @CreateDateColumn()
  createdAt: string;

  @Column({ type: 'varchar' })
  action: OrderAction;
}
