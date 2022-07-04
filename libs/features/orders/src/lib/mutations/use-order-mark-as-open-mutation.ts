import { useMutation, useQueryClient } from 'react-query';
import { OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderMarkAsOpenMutation = (orderSlug: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', orderSlug];
  return useMutation(
    async () => {
      const { data } = await axios.post<OrderModel>(
        `/api/orders/slug/${orderSlug}/mark-as-open`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(queryKey, data);
      },
    }
  );
};
