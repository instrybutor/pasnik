import { useMutation, useQueryClient } from 'react-query';
import { MarkAsOrderedDto, OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderMarkAsOrderedMutation = (order: OrderModel) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', order.slug];
  return useMutation(
    async (markAsOrderedDto: MarkAsOrderedDto) => {
      const { data } = await axios.post<OrderModel>(
        `/api/orders/slug/${order.slug}/mark-as-ordered`,
        markAsOrderedDto
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
