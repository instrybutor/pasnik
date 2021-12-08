import { useCurrentWorkspaceById } from './queries';

export interface WorkspaceNameParams {
  workspaceId: number;
}

export function WorkspaceName({ workspaceId }: WorkspaceNameParams) {
  const workspace = useCurrentWorkspaceById(workspaceId);

  return <span className="truncate">{workspace?.name}</span>;
}
