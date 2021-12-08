import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { WorkspaceUserModel } from '@pasnik/api/data-transfer';

export const useWorkspaceUsers = (slug?: string) => {
  return useQuery(
    ['workspaces', slug, 'users'],
    async () => {
      const { data } = await axios.get<WorkspaceUserModel[]>(
        `/api/workspaces/${slug}/users`
      );
      return data;
    },
    {
      retry: false,
      useErrorBoundary: false,
      enabled: !!slug,
      onError: () => {},
    }
  );
};
