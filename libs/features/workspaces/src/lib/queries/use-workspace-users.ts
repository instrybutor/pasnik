import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { WorkspaceUserModel } from '@pasnik/api/data-transfer';

export const useWorkspaceUsers = (slug?: string, suspense = true) => {
  return useQuery(
    ['workspaces', slug, 'users'],
    async ({ signal }) => {
      const { data } = await axios.get<WorkspaceUserModel[]>(
        `/api/workspaces/${slug}/users`,
        {
          signal,
        }
      );
      return data;
    },
    {
      retry: false,
      useErrorBoundary: false,
      enabled: Boolean(slug),
      refetchOnMount: false,
      suspense,
    }
  );
};
