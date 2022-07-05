import { useMutation, useQueryClient } from 'react-query';
import { UserModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useNotificationSeenMutation = () => {
  const queryClient = useQueryClient();
  const queryKey = ['users', 'me'];
  return useMutation(
    async () => {
      const { data } = await axios.post<UserModel>(
        `/api/users/notifications-seen`
      );
      return data;
    },
    {
      onSuccess: (user) => {
        queryClient.setQueryData(queryKey, user);
      },
    }
  );
};
