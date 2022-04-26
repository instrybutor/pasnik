import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { AxiosError } from 'axios';

export const useWorkspace = (
  slug?: string,
  onError?: (error: AxiosError) => void
) => {
  return useQuery(
    ['workspaces', slug],
    async () => {
      const { data } = await axios.get<WorkspaceModel>(
        `/api/workspaces/${slug}`
      );
      return data;
    },
    {
      retry: false,
      enabled: Boolean(slug),
      onError: (err: AxiosError) => {
        onError?.(err);
      },
      refetchOnMount: false,
    }
  );
};
