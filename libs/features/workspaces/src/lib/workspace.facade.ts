import { useUserStore } from '@pasnik/store';
import { useCallback } from 'react';
import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { useWorkspaceStore } from './workspace.store';

export const useWorkspaceFacade = () => {
  const currentWorkspaceId = useUserStore(
    ({ user }) => user?.currentWorkspaceId
  );

  const currentWorkspace = useWorkspaceStore(
    useCallback(
      ({ entities }) => {
        if (currentWorkspaceId) {
          return entities[currentWorkspaceId];
        }
        return null;
      },
      [currentWorkspaceId]
    )
  );

  const workspaces: WorkspaceModel[] = useWorkspaceStore(({ entities }) =>
    Object.values(entities)
  );

  return {
    currentWorkspaceId,
    currentWorkspace,
    workspaces,
  };
};
