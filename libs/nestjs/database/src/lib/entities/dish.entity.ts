import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';
import { DishModel } from '@pasnik/api/data-transfer';

@Entity()
export class DishEntity implements DishModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  priceCents: number;

  @ManyToOne(() => OrderEntity, (order: OrderEntity) => order.dishes, {
    cascade: true,
  })
  order: OrderEntity;

  @Column()
  orderId: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
