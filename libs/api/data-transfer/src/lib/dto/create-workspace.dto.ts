import { WorkspaceUserRole } from '../models';

export interface CreateWorkspaceUserDto {
  userId: number;
  role: WorkspaceUserRole;
}

export interface CreateWorkspaceDto {
  name: string;
  members?: CreateWorkspaceUserDto[];
}
