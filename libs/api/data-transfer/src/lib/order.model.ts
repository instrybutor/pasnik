import { UserModel } from './user.model';

export enum OrderStatus {
  InProgress,
  Ordered,
  Delivered,
}

export interface DishModel {
  name: string;
  price: number;
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
