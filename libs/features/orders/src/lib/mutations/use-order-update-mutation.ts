import { useMutation, useQueryClient } from 'react-query';
import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderUpdateMutation = (order: OrderModel) => {
  const queryClient = useQueryClient();
  const queryKey = ['workspaces', order.workspace?.slug, 'orders', 'active'];
  return useMutation(
    async (createOrderDto: CreateOrderDto) => {
      const { data } = await axios.put<OrderModel>(
        `/api/orders/slug/${order.slug}`,
        createOrderDto
      );
      return data;
    },
    {
      onSuccess: async (newOrder) => {
        const data = queryClient.getQueryData<OrderModel[]>(queryKey) ?? [];
        const index = data.findIndex(({ slug }) => slug === order.slug);
        const newData =
          index === -1 ? [newOrder, ...data] : data.splice(index, 1, newOrder);
        queryClient.setQueryData(queryKey, newData);
        queryClient.setQueryData(['orders', newOrder.slug], newOrder);
      },
    }
  );
};
