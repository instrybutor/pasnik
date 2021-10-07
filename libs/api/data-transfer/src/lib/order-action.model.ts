import { UserModel } from './user.model';
import { OrderModel } from '@pasnik/api/data-transfer';

export enum OrderAction {
  Created = 'created',
  Ordered = 'ordered',
  Paid = 'paid',
  Delivered = 'delivered',
  Cancel = 'canceled',
  Open = 'open'
}

export interface OrderActionModel {
  id: number;
  user: UserModel;
  actionUser?: UserModel;
  order: OrderModel;
  createdAt: string;
  action: OrderAction;
}
