import { UserModel } from './user.model';
import { DishModel } from './dish.model';
import { OrderActionModel } from './order-action.model';

export enum OrderStatus {
  InProgress = 'in-progress',
  Ordered = 'ordered',
  Delivered = 'delivered',
  Canceled = 'canceled'
}

export interface OrderModel {
  id: string;
  user: UserModel;
  status: OrderStatus;
  from?: string;
  menuUrl: string;
  shippingCents?: number;
  createdAt: string;
  updatedAt: string;
  orderedAt: string;
  payer?: UserModel;
  dishes?: DishModel[];
  actions?: OrderActionModel[];
}

export function getOrderStatus(order: OrderModel) {
  switch(order.status) {
    case OrderStatus.InProgress:
      return 'W trakcie';
    case OrderStatus.Ordered:
      return 'Zamówione';
    case OrderStatus.Delivered:
      return 'Dostarczone';
    case OrderStatus.Canceled:
      return 'Anulowane';
  }
  return 'Nieznany'
}
