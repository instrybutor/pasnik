import { useMutation, useQueryClient } from 'react-query';
import { UpdateWorkspaceDto, WorkspaceModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useWorkspaceUpdateMutation = (slug: string) => {
  const queryKey = ['workspaces', slug];
  const queryClient = useQueryClient();
  return useMutation(
    async (updateWorkspaceDto: UpdateWorkspaceDto) => {
      const { data } = await axios.put<WorkspaceModel>(
        `/api/workspaces/${slug}`,
        updateWorkspaceDto
      );
      return data;
    },
    {
      onMutate: async (updateWorkspaceDto: UpdateWorkspaceDto) => {
        await queryClient.cancelQueries(queryKey);

        const previousWorkspace =
          queryClient.getQueryData<WorkspaceModel>(queryKey);

        queryClient.setQueryData(queryKey, {
          ...previousWorkspace,
          ...updateWorkspaceDto,
        });

        return { previousWorkspace };
      },
      onError: (err, updateWorkspaceDto, context) => {
        queryClient.setQueryData(queryKey, context?.previousWorkspace);
      },
      onSuccess: (workspace) => {
        queryClient.setQueryData(queryKey, workspace);
        queryClient.invalidateQueries(['workspaces']);
      },
    }
  );
};
