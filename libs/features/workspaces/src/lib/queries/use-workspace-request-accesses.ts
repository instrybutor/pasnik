import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { WorkspaceAccessRequestModel } from '@pasnik/api/data-transfer';

export const useWorkspaceRequestAccesses = (slug?: string) => {
  return useQuery(
    ['workspaces', slug, 'access-requests'],
    async ({ signal }) => {
      const { data } = await axios.get<WorkspaceAccessRequestModel[]>(
        `/api/workspaces/${slug}/access-requests`,
        {
          signal,
        }
      );
      return data;
    },
    {
      retry: false,
      enabled: Boolean(slug),
      refetchOnMount: false,
      useErrorBoundary: false,
    }
  );
};
