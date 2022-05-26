import { useMutation, useQueryClient } from 'react-query';
import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useOrderCreateMutation = (workspaceSlug: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['workspaces', workspaceSlug, 'orders', 'active'];
  return useMutation(
    async (createOrderDto: CreateOrderDto) => {
      const { data } = await axios.post<OrderModel>(
        `/api/workspaces/${workspaceSlug}/orders`,
        createOrderDto
      );
      return data;
    },
    {
      onSuccess: (order) => {
        const data = queryClient.getQueryData<OrderModel[]>(queryKey) ?? [];
        queryClient.setQueryData(queryKey, [order, ...data]);
      },
    }
  );
};
