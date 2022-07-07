import { useQuery, UseQueryOptions } from 'react-query';
import axios from '@pasnik/axios';
import { UserModel } from '@pasnik/api/data-transfer';

export const useCurrentUser = (
  options?: Pick<
    UseQueryOptions,
    'onError' | 'suspense' | 'onSuccess' | 'enabled'
  >
) => {
  const query = useQuery<UserModel>(
    ['users', 'me'],
    async ({ signal }) => {
      const { data } = await axios.get<UserModel>(`/auth/me`, {
        signal,
      });
      return data;
    },
    {
      ...options,
      retry: false,
      useErrorBoundary: false,
    }
  );
  return {
    ...query,
    user: query.data,
  };
};
