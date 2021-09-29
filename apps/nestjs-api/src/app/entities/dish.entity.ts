import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserDishEntity } from './user-dish.entity';
import { DishModel } from '@pasnik/api/data-transfer';
import { UserEntity } from './user.entity';

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

  @OneToOne(() => UserEntity)
  @JoinColumn()
  orderer: UserEntity

  @Column({ default: false })
  paid: boolean;

  @OneToMany(() => UserDishEntity, (userDish) => userDish.dish)
  usersDishes: UserDishEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
