import { useUserStore } from '@pasnik/store';
import { useMemo } from 'react';
import { useCurrentWorkspace } from './use-current-workspace';
import { useWorkspaceUsers } from './use-workspace-users';

export const useCurrentWorkspaceUser = () => {
  const { user } = useUserStore();
  const userId = user?.id;
  const currentWorkspace = useCurrentWorkspace();
  const { data } = useWorkspaceUsers(currentWorkspace?.slug);
  return useMemo(() => {
    return data?.find((workspaceUser) => workspaceUser.userId === userId);
  }, [data, userId]);
};
