import { UserModel } from './user.model';

export interface NotificationModel {
  id: string;
  users: UserModel[];
  createdAt: string;
}
