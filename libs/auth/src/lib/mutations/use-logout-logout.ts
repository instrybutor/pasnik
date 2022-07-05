import { useMutation, useQueryClient } from 'react-query';
import axios from '@pasnik/axios';

export const useLogoutLogout = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const { data } = await axios.post(`/auth/logout`);
      return data;
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries();
        await queryClient.cancelMutations();
        await queryClient.invalidateQueries();
        await queryClient.clear();
      },
    }
  );
};
