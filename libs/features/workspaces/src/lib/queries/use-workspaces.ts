import { useQuery, useQueryClient } from 'react-query';
import axios from '@pasnik/axios';
import { WorkspaceModel } from '@pasnik/api/data-transfer';

export const useWorkspaces = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['workspaces'],
    async () => {
      const { data } = await axios.get<WorkspaceModel[]>('/api/workspaces');
      return data;
    },
    {
      onSuccess: (workspaces) => {
        workspaces.forEach((workspace) => {
          queryClient.setQueryData(['workspaces', workspace.slug], workspace);
        });
      },
    }
  );
};
