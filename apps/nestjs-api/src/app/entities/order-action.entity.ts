import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderAction, OrderActionModel } from '@pasnik/api/data-transfer';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderActionEntity implements OrderActionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => OrderEntity)
  order: OrderEntity;

  @CreateDateColumn()
  createdAt: string;

  @Column({ type: 'varchar' })
  action: OrderAction;
}
