import { WorkspaceUserRole } from '../models';

export interface CreateWorkspaceDto {
  name: string;
  members?: Array<{
    userId: number;
    role: WorkspaceUserRole;
  }>;
}
