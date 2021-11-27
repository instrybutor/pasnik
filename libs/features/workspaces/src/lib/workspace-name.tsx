import { useWorkspaceStore } from './workspace.store';
import { useCallback } from 'react';

export interface WorkspaceNameParams {
  workspaceId: number;
}

export function WorkspaceName({ workspaceId }: WorkspaceNameParams) {
  const workspace = useWorkspaceStore(
    useCallback(
      ({ entities }) => {
        return entities[workspaceId];
      },
      [workspaceId]
    )
  );
  return <span className="truncate">{workspace?.name}</span>;
}
