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

        const previousUsers =
          queryClient.getQueryData<WorkspaceUserModel[]>(usersQueryKey);

        const previousWorkspace =
          queryClient.getQueryData<WorkspaceModel>(queryKey);

        queryClient.invalidateQueries(queryKey);
        queryClient.invalidateQueries(usersQueryKey);

        return { previousUsers, previousWorkspace };
      },
      onError: (err, _, context) => {
        queryClient.setQueryData(queryKey, context?.previousWorkspace);
        queryClient.setQueryData(usersQueryKey, context?.previousUsers);
      },
    }
  );
};
