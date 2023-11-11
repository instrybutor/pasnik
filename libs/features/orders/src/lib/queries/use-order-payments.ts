import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { PaymentModel } from '@pasnik/api/data-transfer';

export function useOrderPayments(orderSlug: string, suspense = true) {
  return useQuery(
    ['orders', orderSlug, 'payments'],
    async ({ signal }) => {
      const { data } = await axios.get<PaymentModel[]>(
        `/api/orders/slug/${orderSlug}/payments`,
        { signal }
      );
      return data;
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchInterval: 5000,
      suspense,
    }
  );
}
