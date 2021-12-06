import { useUserStore } from '@pasnik/store';
import { useMemo } from 'react';
import { useWorkspaceStore } from './workspace.store';

export const useWorkspaceUsersFacade = () => {
  const { user } = useUserStore();
  const workspaceUserEntities = useWorkspaceStore(({ users }) => users);
  const workspaceUsers = useMemo(
    () => Object.values(workspaceUserEntities),
    [workspaceUserEntities]
  );
  const mappedWorkspaceUsers = useMemo(
    () => workspaceUsers.map(({ user }) => user!) ?? [],
    [workspaceUsers]
  );
  const currentWorkspaceUser = useMemo(
    () =>
      workspaceUsers.find((workspaceUser) => workspaceUser.userId === user?.id),
    [workspaceUsers, user]
  );

  return {
    currentWorkspaceUser,
    workspaceUsers,
    workspaceUserEntities,
    mappedWorkspaceUsers,
  };
};
