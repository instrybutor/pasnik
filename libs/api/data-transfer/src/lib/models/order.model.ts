import { UserModel } from './user.model';
import { DishModel } from './dish.model';
import { OrderActionModel } from './order-action.model';
import { WorkspaceModel } from './workspace.model';

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
  user: UserModel;
  userId: number;
  status: OrderStatus;
  from: string;
  slug: string;
  menuUrl?: string;
  shippingCents?: number;
  createdAt: string;
  updatedAt: string;
  orderedAt: string;
  deliveredAt: string;
  payer?: UserModel;
  dishes?: DishModel[];
  actions?: OrderActionModel[];
  totalPrice: number;
  workspace?: WorkspaceModel;
  workspaceId: number;
  participants?: UserModel[];
}
