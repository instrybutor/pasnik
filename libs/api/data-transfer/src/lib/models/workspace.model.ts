// import { WorkspaceUserModel } from './workspace-user.model';

export enum WorkspacePrivacy {
  Public = 'public',
  PrivateToMembers = 'members',
  PrivateToYou = 'private',
}

export interface WorkspaceModel {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  privacy: WorkspacePrivacy;
  // workspaceUsers?: WorkspaceUserModel[];
}
