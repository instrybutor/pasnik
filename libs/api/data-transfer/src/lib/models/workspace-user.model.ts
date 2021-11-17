import { WorkspaceModel } from './workspace.model';
import { UserModel } from './user.model';

export enum WorkspaceUserRole {
  Admin = 'admin',
  User = 'user',
}

export interface WorkspaceUserModel {
  createdAt: string;
  workspace: WorkspaceModel;
  user: UserModel;
  addedBy: UserModel;
  role: WorkspaceUserRole;
}
