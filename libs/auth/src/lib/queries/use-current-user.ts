import { useQuery, UseQueryOptions } from 'react-query';
import axios from '@pasnik/axios';
import { UserModel } from '@pasnik/api/data-transfer';

export const currentUserQueryKey = ['users', 'me'];

export const useCurrentUser = (
  options?: Pick<
    UseQueryOptions,
    'onError' | 'suspense' | 'onSuccess' | 'enabled'
  >
) => {
  const query = useQuery<UserModel>(
    currentUserQueryKey,
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
