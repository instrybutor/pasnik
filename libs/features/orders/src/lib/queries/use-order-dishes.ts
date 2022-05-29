import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { DishModel, OrderModel } from '@pasnik/api/data-transfer';

export function useOrderDishes(order: OrderModel) {
  return useQuery(
    ['orders', order.slug, 'dishes'],
    async () => {
      const { data } = await axios.get<DishModel[]>(
        `/api/orders/slug/${order.slug}/dishes`
      );
      return data;
    },
    {
      retry: false,
      refetchOnMount: false,
    }
  );
}
