import { useMutation, useQueryClient } from 'react-query';
import { WorkspaceUserModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useWorkspaceRequestAccessMutation = (slug: string) => {
  const queryKey = ['workspaces', slug];
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const { data } = await axios.put<WorkspaceUserModel>(
        `api/workspaces/${slug}/request-access`
      );
      return data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
