import { useMutation, useQueryClient } from 'react-query';
import { CreateWorkspaceDto, WorkspaceModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useWorkspaceCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (createWorkspaceDto: CreateWorkspaceDto) => {
      const { data } = await axios.post<WorkspaceModel>(
        '/api/workspaces',
        createWorkspaceDto
      );
      return data;
    },
    {
      onSuccess: (workspace) => {
        queryClient.setQueryData(['workspaces', workspace.slug], workspace);
        queryClient.invalidateQueries(['workspaces']);
      },
    }
  );
};
