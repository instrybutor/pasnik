import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { ExpenseModel } from '@pasnik/api/data-transfer';

export function useOrderDishes(orderSlug: string, suspense = true) {
  return useQuery(
    ['orders', orderSlug, 'dishes'],
    async ({ signal }) => {
      const { data } = await axios.get<ExpenseModel[]>(
        `/api/orders/slug/${orderSlug}/dishes`,
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
