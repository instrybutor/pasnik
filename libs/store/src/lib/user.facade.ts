import { useUserStore, useWorkspaceStore } from '@pasnik/store';
import { useCallback } from 'react';

export function useUserFacade() {
  const user = useUserStore(({ user }) => user);
  const workspace = useWorkspaceStore(
    useCallback(
      ({ workspaces, ids }) => {
        if (user?.currentWorkspaceId) {
          return workspaces[ids.indexOf(user.currentWorkspaceId)];
        }
        return null;
      },
      [user?.currentWorkspaceId]
    )
  );

  return {
    user,
    workspace,
  };
}
