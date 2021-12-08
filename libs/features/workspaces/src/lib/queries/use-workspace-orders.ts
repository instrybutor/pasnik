import { useQuery } from 'react-query';
import axios from '@pasnik/axios';
import { OrderModel } from '@pasnik/api/data-transfer';

export const useWorkspaceOrders = (
  slug?: string,
  type: 'active' | 'inactive' = 'active'
) => {
  return useQuery(
    ['workspaces', slug, 'orders', type],
    async () => {
      const { data } = await axios.get<OrderModel[]>(
        `/api/workspaces/${slug}/orders/${type}`
      );
      return data;
    },
    {
      useErrorBoundary: true,
      retry: false,
      enabled: !!slug,
      refetchOnMount: true,
    }
  );
};
