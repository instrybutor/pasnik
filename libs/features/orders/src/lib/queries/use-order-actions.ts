import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { OrderActionModel, OrderModel } from '@pasnik/api/data-transfer';

export function useOrderActions(order: OrderModel) {
  return useQuery(
    ['orders', order.slug, 'actions'],
    async ({ signal }) => {
      const { data } = await axios.get<OrderActionModel[]>(
        `/api/orders/slug/${order.slug}/actions`,
        { signal }
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
