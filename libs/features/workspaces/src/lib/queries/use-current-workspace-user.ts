import { useUserStore } from '@pasnik/store';
import { useMemo } from 'react';
import { useWorkspaceUsers } from './use-workspace-users';

export const useCurrentWorkspaceUser = (slug?: string) => {
  const { user } = useUserStore();
  const userId = user?.id;
  const { data } = useWorkspaceUsers(slug);

  return useMemo(() => {
    return data?.find((workspaceUser) => workspaceUser.userId === userId);
  }, [data, userId]);
};
