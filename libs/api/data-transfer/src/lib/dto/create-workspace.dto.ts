import { WorkspacePrivacy } from '../models';

export interface CreateWorkspaceDto {
  name: string;
  privacy: WorkspacePrivacy;
}
