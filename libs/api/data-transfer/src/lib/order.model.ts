import { UserModel } from './user.model';

export enum OrderStatus {
  InProgress = 'in-progress',
  Ordered = 'ordered',
  Delivered = 'delivered',
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
  dishes: unknown[];
}

export function getOrderStatus(order: OrderModel) {
  switch(order.status) {
    case OrderStatus.InProgress:
      return 'W trakcie';
    case OrderStatus.Ordered:
      return 'Zamówione';
    case OrderStatus.Delivered:
      return 'Dostarczone';
  }
  return 'Nieznany'
}
