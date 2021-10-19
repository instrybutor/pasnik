import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
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

  @Column()
  orderId: string;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  user?: UserEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
