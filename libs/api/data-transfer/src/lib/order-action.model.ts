import { UserModel } from './user.model';
import { OrderModel } from '@pasnik/api/data-transfer';

export enum OrderAction {
  Created = 'created',
  Ordered = 'ordered',
  Paid = 'paid',
  Completed = 'completed',
  Closed = 'closed',
  Open = 'open'
}

export interface OrderActionModel {
  id: number;
  user: UserModel;
  order: OrderModel;
  createdAt: string;
  action: OrderAction;
}
