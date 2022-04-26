import { useMutation, useQueryClient } from 'react-query';
import axios from '@pasnik/axios';
import { WorkspaceUserModel } from '@pasnik/api/data-transfer';

export const useWorkspaceRemoveMembersMutation = (slug: string) => {
  const queryClient = useQueryClient();
  const workspaceUsersQueryKey = ['workspaces', slug, 'users'];
  return useMutation(
    async (workspaceUser: WorkspaceUserModel) => {
      const { data } = await axios.delete<WorkspaceUserModel>(
        `/api/workspaces/${slug}/users/${workspaceUser.id}`
      );
      return data;
    },
    {
      onSuccess: (workspaceUser) => {
        const workspaceUsersQueryData =
          queryClient.getQueryData<WorkspaceUserModel[]>(
            workspaceUsersQueryKey
          ) ?? [];
        queryClient.setQueryData(
          workspaceUsersQueryKey,
          workspaceUsersQueryData.filter(({ id }) => workspaceUser.id !== id)
        );
      },
    }
  );
};
