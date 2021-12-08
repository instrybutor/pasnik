import { WorkspaceModel } from '@pasnik/api/data-transfer';

export interface WorkspaceNameParams {
  workspace?: WorkspaceModel;
}

export function WorkspaceName({ workspace }: WorkspaceNameParams) {
  return <span className="truncate">{workspace?.name}</span>;
}
