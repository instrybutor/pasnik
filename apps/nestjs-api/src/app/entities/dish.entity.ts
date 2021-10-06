import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserDishEntity } from './user-dish.entity';
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

  @OneToMany(() => UserDishEntity, (userDish) => userDish.dish)
  usersDishes: UserDishEntity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
