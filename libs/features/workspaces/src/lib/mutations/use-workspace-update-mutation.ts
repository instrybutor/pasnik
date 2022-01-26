import { useMutation, useQueryClient } from 'react-query';
import { UpdateWorkspaceDto, WorkspaceModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';
import { renameQueryData } from './rename-query-data';

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
      onSuccess: (updatedWorkspace) => {
        queryClient.invalidateQueries(queryKey, { refetchActive: false }); // in case of slug has changed
        queryClient.setQueryData(
          ['workspaces', updatedWorkspace.slug],
          updatedWorkspace
        );
        const previousWorkspaces =
          queryClient.getQueryData<WorkspaceModel[]>(['workspaces']) ?? [];
        const previousWorkspaceIndex = previousWorkspaces.findIndex(
          (workspace) => workspace.slug === slug
        );
        const newWorkspaces = [...previousWorkspaces];
        newWorkspaces[previousWorkspaceIndex] = updatedWorkspace;
        queryClient.setQueryData(['workspaces'], newWorkspaces);

        renameQueryData(
          queryClient,
          ['workspaces', slug, 'users'],
          ['workspaces', updatedWorkspace.slug, 'users']
        );

        renameQueryData(
          queryClient,
          ['workspaces', slug, 'orders', 'active'],
          ['workspaces', updatedWorkspace.slug, 'orders', 'active']
        );

        renameQueryData(
          queryClient,
          ['workspaces', slug, 'orders', 'inactive'],
          ['workspaces', updatedWorkspace.slug, 'orders', 'inactive']
        );
      },
    }
  );
};
