import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { OrderModel } from '@pasnik/api/data-transfer';

export const useActiveOrders = () => {
  return useQuery(
    ['orders', 'active'],
    async ({ signal }) => {
      const { data } = await axios.get<OrderModel[]>(`/api/orders/active`, {
        signal,
      });
      return data;
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchInterval: 5000,
    }
  );
};
