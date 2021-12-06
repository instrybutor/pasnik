import { useUserStore } from '@pasnik/store';
import { useCallback } from 'react';
import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { useWorkspaceStore } from './workspace.store';
import { useNavigate } from 'react-router-dom';

export const useWorkspaceFacade = () => {
  const currentWorkspaceId = useUserStore(
    ({ user }) => user?.currentWorkspaceId
  );

  const removeWorkspaceFromStore = useWorkspaceStore(
    ({ removeWorkspace }) => removeWorkspace
  );

  const changeCurrentWorkspace = useUserStore(
    ({ changeWorkspace }) => changeWorkspace
  );

  const navigate = useNavigate();

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

  const changeWorkspace = useCallback(
    async (workspace: WorkspaceModel) => {
      await changeCurrentWorkspace(workspace);
      navigate(`/workspace/${workspace.slug}`);
    },
    [changeCurrentWorkspace, navigate]
  );

  const removeWorkspace = useCallback(
    async (workspace: WorkspaceModel) => {
      await removeWorkspaceFromStore(workspace);
      await changeWorkspace(workspaces[0]);
    },
    [changeWorkspace, workspaces, removeWorkspaceFromStore]
  );

  return {
    currentWorkspaceId,
    currentWorkspace,
    changeWorkspace,
    workspaces,
    removeWorkspace,
  };
};
