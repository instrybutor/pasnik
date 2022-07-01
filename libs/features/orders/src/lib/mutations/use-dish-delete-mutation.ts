import { useMutation, useQueryClient } from 'react-query';
import { DishModel, OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useDishDeleteMutation = (order: OrderModel, dish: DishModel) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', order.slug, 'dishes'];
  return useMutation(
    async () => {
      const { data } = await axios.delete(
        `/api/orders/slug/${order.slug}/dishes/${dish.id}`
      );
      return data;
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(queryKey);

        const prevDishes = queryClient.getQueryData<DishModel[]>(queryKey);
        queryClient.setQueryData<DishModel[]>(queryKey, (prev = []) =>
          prev.filter((item) => item.id !== dish.id)
        );

        return { prevDishes };
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
