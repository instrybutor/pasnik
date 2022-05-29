import { useMutation, useQueryClient } from 'react-query';
import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderUpdateMutation = (order: OrderModel) => {
  const queryClient = useQueryClient();
  const queryKey = ['workspaces', order.workspace?.slug, 'orders', 'active'];
  const orderQueryKey = ['orders', order.slug];
  return useMutation(
    async (createOrderDto: CreateOrderDto) => {
      const { data } = await axios.put<OrderModel>(
        `/api/orders/slug/${order.slug}`,
        createOrderDto
      );
      return data;
    },
    {
      onSuccess: (newOrder) => {
        const data = queryClient.getQueryData<OrderModel[]>(queryKey) ?? [];
        const index = data.findIndex(({ id }) => id === newOrder.id);
        const newData =
          index === -1 ? [newOrder, ...data] : data.splice(index, 1, newOrder);
        queryClient.setQueryData(queryKey, newData);
        if (newOrder.slug !== order.slug) {
          queryClient.invalidateQueries(orderQueryKey);
        }
        queryClient.setQueryData(['orders', newOrder.slug], order);
      },
    }
  );
};
