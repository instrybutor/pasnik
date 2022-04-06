import { WorkspaceUserModel } from '../models/workspace-user.model';

export type UpdateWorkspaceUserDto = Partial<Pick<WorkspaceUserModel, 'role'>>;
