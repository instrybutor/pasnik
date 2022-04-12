import { WorkspacePrivacy } from '../models';

export interface UpdateWorkspaceDto {
  name: string;
  privacy: WorkspacePrivacy;
  workspaceOwnerId?: number;
}
