import { WorkspaceUserModel } from './workspace-user.model';

export interface WorkspaceModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  workspaceUsers?: WorkspaceUserModel[];
}
