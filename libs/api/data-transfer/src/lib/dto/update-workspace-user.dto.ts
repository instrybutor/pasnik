import { WorkspaceUserModel } from '@pasnik/api/data-transfer';

export type UpdateWorkspaceUserDto = Partial<Pick<WorkspaceUserModel, 'role'>>;
{
}
