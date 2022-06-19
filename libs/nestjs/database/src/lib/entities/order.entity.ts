import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { DishEntity } from './dish.entity';
import { OrderActionEntity } from './order-action.entity';

import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { WorkspaceEntity } from './workspace.entity';

@Entity()
export class OrderEntity implements OrderModel {
  readonly kind = 'OrderModel';

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, { nullable: true })
  payer?: UserEntity;

  @Column({ type: 'varchar', default: OrderStatus.InProgress })
  status: OrderStatus;

  @Column()
  from: string;

  @Column({ nullable: true })
  menuUrl?: string;

  @Column({ default: 0 })
  shippingCents: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ type: 'timestamptz', nullable: true })
  orderedAt: string;

  @Column({ type: 'timestamptz', nullable: true })
  deliveredAt: string;

  @OneToMany(() => DishEntity, (dish) => dish.order)
  dishes: DishEntity[];

  @OneToMany(() => OrderActionEntity, (action) => action.order)
  actions: OrderActionEntity[];

  @Column({ default: 0 })
  totalPrice: number;

  @ManyToOne(() => WorkspaceEntity, { nullable: false, onDelete: 'CASCADE' })
  workspace: WorkspaceEntity;

  @Column()
  workspaceId: number;

  @ManyToMany(() => UserEntity)
  participants: UserEntity[];
}
