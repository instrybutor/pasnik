import { useMutation, useQueryClient } from 'react-query';
import axios from '@pasnik/axios';
import { useNavigate } from 'react-router-dom';

export const useLogoutLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    async () => {
      const { data } = await axios.post(`/auth/logout`);
      return data;
    },
    {
      onSuccess: async () => {
        navigate('/login');
        await queryClient.resetQueries();
        await queryClient.clear();
      },
    }
  );
};
