import { UserModel } from './user.model';

export enum NotificationType {
  OrderStatusChanged = 'ORDER_STATUS_CHANGED',
}

export type NotificationAction = `${NotificationType}`;

export interface NotificationModel<T = unknown> {
  id: string;
  action: NotificationAction;
  data?: T;
  users: UserModel[];
  createdAt: string;
}
