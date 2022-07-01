import { useMutation, useQueryClient } from 'react-query';
import { OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderMarkAsProcessingMutation = (order: OrderModel) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', order.slug];
  return useMutation(
    async () => {
      const { data } = await axios.post<OrderModel>(
        `/api/orders/slug/${order.slug}/mark-as-processing`
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
