import { UserModel } from './user.model';

export enum NotificationType {
  STATUS_CHANGED = 'ORDER_STATUS_CHANGED',
  INVITATION_SENT = 'INVITATION_SENT',
}

export type NotificationAction = `${NotificationType}`;

export interface NotificationModel<T = unknown> {
  id: string;
  action: NotificationAction;
  data?: T;
  users: UserModel[];
  createdAt: string;
}
