import { useMemo } from 'react';
import { useWorkspaceUsers } from './use-workspace-users';
import { UserModel } from '@pasnik/api/data-transfer';

export const useWorkspaceUser = (
  workspaceSlug?: string,
  user?: UserModel,
  suspense = true
) => {
  const { data } = useWorkspaceUsers(workspaceSlug, suspense);

  return useMemo(() => {
    return data?.find((workspaceUser) => workspaceUser.userId === user?.id);
  }, [data, user?.id]);
};
