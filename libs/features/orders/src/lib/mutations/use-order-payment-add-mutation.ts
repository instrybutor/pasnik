import { useMutation, useQueryClient } from 'react-query';
import { AddPayerToOrderDto, PaymentModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderPaymentAddMutation = (orderSlug: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', orderSlug, 'payments'];
  return useMutation(
    async (addPayerToOrder: AddPayerToOrderDto) => {
      const { data } = await axios.put<PaymentModel>(
        `/api/orders/slug/${orderSlug}/payments`,
        addPayerToOrder
      );
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
