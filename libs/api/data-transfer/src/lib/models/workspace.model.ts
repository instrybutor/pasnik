import { WorkspaceUserModel } from './workspace-user.model';

export interface WorkspaceModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  workspaceUsers?: WorkspaceUserModel[];
}
