import { useMutation, useQueryClient } from 'react-query';
import { MarkAsOrderedDto, OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderMarkAsOrderedMutation = (orderSlug: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', orderSlug];
  return useMutation(
    async (markAsOrderedDto: MarkAsOrderedDto) => {
      const { data } = await axios.post<OrderModel>(
        `/api/orders/slug/${orderSlug}/mark-as-ordered`,
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
