import { UserModel } from './user.model';

export enum OrderStatus {
  InProgress,
  Ordered,
  Delivered,
}

export interface OrderModel {
  id: number;
  user: UserModel;
  status: OrderStatus;
  from?: string;
  menuUrl: string;
  shippingCents?: number;
  createdAt: Date;
  updatedAt: Date;
  orderedAt: Date;
  dishes: unknown[];
}
