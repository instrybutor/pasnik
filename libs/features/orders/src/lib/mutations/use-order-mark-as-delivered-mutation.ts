import { useMutation, useQueryClient } from 'react-query';
import { MarkAsDeliveredDto, OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderMarkAsDeliveredMutation = (order: OrderModel) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', order.slug];
  return useMutation(
    async (markAsDeliveredDto: MarkAsDeliveredDto) => {
      const { data } = await axios.post<OrderModel>(
        `/api/orders/slug/${order.slug}/mark-as-delivered`,
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
