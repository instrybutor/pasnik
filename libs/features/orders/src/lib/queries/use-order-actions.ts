import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { OrderActionModel, OrderModel } from '@pasnik/api/data-transfer';

export function useOrderActions(order: OrderModel) {
  return useQuery(
    ['orders', order.slug, 'actions'],
    async () => {
      const { data } = await axios.get<OrderActionModel[]>(
        `/api/orders/slug/${order.slug}/actions`
      );
      return data;
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchInterval: 5000,
    }
  );
}
