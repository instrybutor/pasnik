import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { WorkspaceModel } from '@pasnik/api/data-transfer';

export const useWorkspace = (slug?: string, suspense = true) => {
  return useQuery(
    ['workspaces', slug],
    async ({ signal }) => {
      const { data } = await axios.get<WorkspaceModel>(
        `/api/workspaces/${slug}`,
        { signal }
      );
      return data;
    },
    {
      retry: false,
      enabled: Boolean(slug),
      refetchOnMount: false,
      suspense,
    }
  );
};
