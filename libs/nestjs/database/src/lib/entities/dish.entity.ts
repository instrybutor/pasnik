import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { DishModel } from '@pasnik/api/data-transfer';
import { ExpenseEntity } from './expense.entity';

@Entity()
export class DishEntity implements DishModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => OrderEntity, (order: OrderEntity) => order.dishes, {
    cascade: true,
  })
  order: OrderEntity;

  @Column()
  orderId: string;

  @OneToOne(() => ExpenseEntity, { cascade: true, eager: true })
  @JoinColumn()
  expense: ExpenseEntity;

  @Column()
  expenseId: number;
}
