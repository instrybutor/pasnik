import { useMutation, useQueryClient } from 'react-query';
import { WorkspaceModel, WorkspaceUserModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';
import { useUserStore } from '@pasnik/store';

export const useWorkspaceLeaveMutation = (slug: string) => {
  const workspacesQueryKey = ['workspaces'];
  const queryKey = ['workspaces', slug, 'users'];
  const queryClient = useQueryClient();
  const { user, changeWorkspace } = useUserStore();
  return useMutation(
    async () => {
      const { data } = await axios.put<WorkspaceUserModel>(
        `api/workspaces/${slug}/leave`
      );
      return data;
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(queryKey);

        const previousUsers =
          queryClient.getQueryData<WorkspaceUserModel[]>(queryKey) ?? [];

        queryClient.setQueryData(
          queryKey,
          previousUsers.filter(
            (workspaceUser) => workspaceUser.user?.id !== user?.id
          )
        );

        return { previousUsers };
      },
      onError: (err, slug, context) => {
        queryClient.setQueryData(queryKey, context?.previousUsers);
      },
      onSuccess: async () => {
        await queryClient.cancelQueries(workspacesQueryKey);

        const previousWorkspaces =
          queryClient.getQueryData<WorkspaceModel[]>(workspacesQueryKey) ?? [];

        const filteredWorkspaces = previousWorkspaces.filter(
          (workspace) => workspace.slug !== slug
        );

        queryClient.setQueryData(workspacesQueryKey, filteredWorkspaces);

        if (filteredWorkspaces[0]) {
          await changeWorkspace(filteredWorkspaces[0]);
        }
      },
    }
  );
};
