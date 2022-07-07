import { useMutation, useQueryClient } from 'react-query';
import { MarkAsDeliveredDto, OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderMarkAsDeliveredMutation = (orderSlug: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', orderSlug];
  return useMutation(
    async (markAsDeliveredDto: MarkAsDeliveredDto) => {
      const { data } = await axios.post<OrderModel>(
        `/api/orders/slug/${orderSlug}/mark-as-delivered`,
        markAsDeliveredDto
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
