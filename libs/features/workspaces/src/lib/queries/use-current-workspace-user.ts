import { useMemo } from 'react';
import { useCurrentUser } from '@pasnik/auth';
import { useWorkspaceUsers } from './use-workspace-users';

export const useCurrentWorkspaceUser = (slug?: string) => {
  const user = useCurrentUser();
  const { data } = useWorkspaceUsers(slug);

  return useMemo(() => {
    return data?.find((workspaceUser) => workspaceUser.userId === user.id);
  }, [data, user.id]);
};
