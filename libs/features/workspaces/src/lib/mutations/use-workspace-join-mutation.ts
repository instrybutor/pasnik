import { useMutation, useQueryClient } from 'react-query';
import { WorkspaceModel, WorkspaceUserModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';
import { useUserStore } from '@pasnik/store';
import { useWorkspace } from '../queries';

export const useWorkspaceJoinMutation = (slug: string) => {
  const queryKey = ['workspaces', slug, 'users'];
  const queryClient = useQueryClient();
  const { data: workspace } = useWorkspace(slug);
  const { changeWorkspace } = useUserStore();
  return useMutation(
    async () => {
      const { data } = await axios.put<WorkspaceUserModel>(
        `api/workspaces/${slug}/join`
      );
      return data;
    },
    {
      onSuccess: async (workspaceUser) => {
        const queryData =
          queryClient.getQueryData<WorkspaceUserModel[]>(queryKey) ?? [];
        queryClient.setQueryData(queryKey, [...queryData, workspaceUser]);

        if (workspace) {
          const workspaces =
            queryClient.getQueryData<WorkspaceModel[]>(['workspaces']) ?? [];
          queryClient.setQueryData(['workspaces'], [...workspaces, workspace]);
          await changeWorkspace(workspace);
        }
      },
    }
  );
};
