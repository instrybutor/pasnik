import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderActionEntity } from './order-action.entity';

import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { WorkspaceEntity } from './workspace.entity';
import { OperationEntity } from './operation.entity';
import { WorkspaceUserEntity } from './workspace-user.entity';
import { DishEntity } from './dish.entity';

@Entity()
export class OrderEntity implements OrderModel {
  readonly kind = 'OrderModel';

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string;

  @ManyToOne(() => WorkspaceUserEntity)
  workspaceUser: WorkspaceUserEntity;

  @Column()
  workspaceUserId: number;

  @Column({ type: 'varchar', default: OrderStatus.InProgress })
  status: OrderStatus;

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

  @OneToMany(() => OrderActionEntity, (action) => action.order)
  actions: OrderActionEntity[];

  @OneToMany(() => DishEntity, (dish) => dish.order)
  dishes: DishEntity[];

  @ManyToOne(() => WorkspaceEntity, { nullable: false, onDelete: 'CASCADE' })
  workspace: WorkspaceEntity;

  @Column({ nullable: true })
  workspaceId: number;

  @ManyToMany(() => WorkspaceUserEntity)
  participants: WorkspaceUserEntity[];

  @OneToOne(() => OperationEntity, { cascade: true, eager: true })
  @JoinColumn()
  operation: OperationEntity;

  @Column({ nullable: true })
  operationId: number;
}
