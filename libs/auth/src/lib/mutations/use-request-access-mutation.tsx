import { useMutation } from 'react-query';
import axios from '@pasnik/axios';

export const useRequestAccessMutation = () => {
  return useMutation(async (requestToken: string) => {
    const { data } = await axios.post(`/auth/request-access`, { requestToken });
    return data;
  });
};
