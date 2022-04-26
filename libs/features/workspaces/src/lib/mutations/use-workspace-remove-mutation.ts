import { useMutation, useQueryClient } from 'react-query';
import { WorkspaceModel, WorkspaceUserModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useWorkspaceRemoveMutation = (slug: string) => {
  const queryKey = ['workspaces', slug];
  const usersQueryKey = ['workspaces', slug, 'users'];
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const { data } = await axios.delete<WorkspaceModel>(
        `api/workspaces/${slug}`
      );
      return data;
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(queryKey);
        await queryClient.cancelQueries(usersQueryKey);

        const previousUsers =
          queryClient.getQueryData<WorkspaceUserModel[]>(usersQueryKey);

        const previousWorkspace =
          queryClient.getQueryData<WorkspaceModel>(queryKey);

        await queryClient.invalidateQueries(queryKey);
        await queryClient.invalidateQueries(usersQueryKey);

        return { previousUsers, previousWorkspace };
      },
      onSuccess: (removedWorkspace) => {
        const workspacesQueryKey = ['workspaces'];
        const workspaces =
          queryClient.getQueryData<WorkspaceModel[]>(workspacesQueryKey) ?? [];
        const updatedWorkspaces = workspaces.filter(
          (workspace) => workspace.id !== removedWorkspace.id
        );
        queryClient.setQueryData(workspacesQueryKey, updatedWorkspaces);
      },
      onError: (err, _, context) => {
        queryClient.setQueryData(queryKey, context?.previousWorkspace);
        queryClient.setQueryData(usersQueryKey, context?.previousUsers);
      },
    }
  );
};
