import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { UserModel } from '@pasnik/api/data-transfer';

export const useUsers = () => {
  return useQuery<UserModel[]>(
    ['users'],
    async ({ signal }) => {
      const { data } = await axios.get<UserModel[]>(`/auth/users`, {
        signal,
      });
      return data;
    },
    {
      retry: false,
    }
  );
};
