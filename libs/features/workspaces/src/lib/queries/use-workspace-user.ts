import { useMemo } from 'react';
import { useWorkspaceUsers } from './use-workspace-users';
import { UserModel, WorkspaceModel } from '@pasnik/api/data-transfer';

export const useWorkspaceUser = (
  workspace?: WorkspaceModel,
  user?: UserModel
) => {
  const { data } = useWorkspaceUsers(workspace?.slug);

  return useMemo(() => {
    return data?.find((workspaceUser) => workspaceUser.userId === user?.id);
  }, [data, user?.id]);
};
