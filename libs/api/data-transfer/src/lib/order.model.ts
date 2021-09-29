import { DishModel } from '@pasnik/api/data-transfer';
import { UserModel } from './user.model';

export enum OrderStatus {
  InProgress,
  Ordered,
  Delivered,
}

export interface OrderModel {
  id: string;
  user: UserModel;
  status: OrderStatus;
  from?: string;
  menuUrl: string;
  shippingCents?: number;
  createdAt: Date;
  updatedAt: Date;
  orderedAt: string;
  dishes: DishModel[];
}
