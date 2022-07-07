import { useMutation, useQueryClient } from 'react-query';
import { OrderModel, SetETADto } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderSetETAMutation = (orderSlug: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', orderSlug];
  return useMutation(
    async (setETADto: SetETADto) => {
      const { data } = await axios.post<OrderModel>(
        `/api/orders/slug/${orderSlug}/set-eta`,
        setETADto
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
