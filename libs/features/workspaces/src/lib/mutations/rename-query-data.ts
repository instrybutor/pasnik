import { QueryClient } from 'react-query';
import { QueryKey } from 'react-query/types/core/types';

export function renameQueryData(
  queryClient: QueryClient,
  oldQueryKey: QueryKey,
  newQueryKey: QueryKey
) {
  const queryData = queryClient.getQueryData(oldQueryKey);
  queryClient.invalidateQueries(oldQueryKey, {
    refetchActive: false,
  });
  queryClient.setQueryData(newQueryKey, queryData);
}
