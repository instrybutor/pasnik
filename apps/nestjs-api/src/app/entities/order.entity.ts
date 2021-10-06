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
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';

@Entity()
export class OrderEntity implements OrderModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({ type: 'varchar', default: OrderStatus.InProgress })
  status: OrderStatus;

  @Column({ nullable: true })
  from?: string;

  @Column()
  menuUrl: string;

  @Column({ default: 0 })
  shippingCents: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ type: 'timestamptz' })
  orderedAt: string;

  @OneToMany(() => DishEntity, (dish) => dish.order)
  dishes: DishEntity[];
}
