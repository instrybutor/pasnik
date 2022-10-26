import { OrderActionModel } from './order-action.model';
import { OperationModel } from './operation.model';
import { DishModel } from './dish.model';
import { WorkspaceUserModel } from './workspace-user.model';

export enum OrderStatus {
  InProgress = 'in-progress',
  Processing = 'processing',
  Ordered = 'ordered',
  Delivered = 'delivered',
  Canceled = 'canceled',
}

export interface OrderModel {
  kind: 'OrderModel';
  id: string;
  status: OrderStatus;
  slug: string;
  menuUrl?: string;
  shippingCents?: number;
  createdAt: string;
  updatedAt: string;
  orderedAt: string;
  deliveredAt: string;
  operation: OperationModel;
  actions?: OrderActionModel[];
  dishes: DishModel[];
  participants: WorkspaceUserModel[];
}
