import { WorkspaceModel } from './workspace.model';
import { UserModel } from './user.model';

export enum WorkspaceUserRole {
  Owner = 'owner',
  Admin = 'admin',
  User = 'user',
}

export interface WorkspaceUserModel<U = UserModel | undefined> {
  kind: 'WorkspaceUserModel';
  id: number;
  createdAt: string;
  workspace?: WorkspaceModel;
  workspaceId: number;
  user: U;
  userId: number;
  addedBy: UserModel;
  role: WorkspaceUserRole;
}
