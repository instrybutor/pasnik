import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { OrderModel } from '@pasnik/api/data-transfer';

export const useOrder = (slug: string) => {
  return useQuery(
    ['orders', slug],
    async () => {
      const { data } = await axios.get<OrderModel>(`/api/orders/slug/${slug}`);
      return data;
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchInterval: 5000,
    }
  );
};
