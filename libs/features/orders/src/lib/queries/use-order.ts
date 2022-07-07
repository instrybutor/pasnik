import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { OrderModel } from '@pasnik/api/data-transfer';

export const useOrder = (slug?: string, suspense = true) => {
  return useQuery(
    ['orders', slug],
    async ({ signal }) => {
      const { data } = await axios.get<OrderModel>(`/api/orders/slug/${slug}`, {
        signal,
      });
      return data;
    },
    {
      enabled: Boolean(slug),
      retry: false,
      refetchOnMount: false,
      refetchInterval: 5000,
      suspense,
    }
  );
};
