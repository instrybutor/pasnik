import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { DishEntity } from './dish.entity';

export enum OrderStatus {
  InProgress,
  Ordered,
  Delivered,
}

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  status: OrderStatus;

  @Column()
  from: string;

  @Column()
  shippingCents: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  orderedAt: Date;

  @OneToMany(() => DishEntity, (dish) => dish.order)
  dishes: OrderEntity[];
}
