import { useQuery, useQueryClient } from 'react-query';
import axios from '@pasnik/axios';
import { UserModel, WorkspaceUserModel } from '@pasnik/api/data-transfer';
import { Dictionary, toEntities } from '@pasnik/shared/utils';

export const useWorkspaceUsers = (slug?: string, suspense = true) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['workspaces', slug, 'users'],
    async ({ signal }) => {
      const { data } = await axios.get<WorkspaceUserModel<UserModel>[]>(
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
      onSuccess: (data) => {
        const entitiesQueryKey = ['workspaces', 'users'];
        const currentData =
          queryClient.getQueryData<Dictionary<WorkspaceUserModel<UserModel>>>(
            entitiesQueryKey
          ) ?? {};
        const newData = {
          ...currentData,
          ...toEntities(data),
        };

        queryClient.setQueryData(entitiesQueryKey, newData);
      },
    }
  );
};
