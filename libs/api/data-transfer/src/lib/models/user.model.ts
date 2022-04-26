import { WorkspaceModel } from './workspace.model';

export interface UserModel {
  kind: 'UserModel';
  id: number;
  isAdmin: boolean;
  givenName?: string;
  familyName?: string;
  email: string;
  avatarImg?: string | null;
  currentWorkspace: WorkspaceModel;
  lastNotificationDate: Date;
  currentWorkspaceId: number;
}
