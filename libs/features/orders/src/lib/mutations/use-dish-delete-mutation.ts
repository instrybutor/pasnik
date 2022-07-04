import { useMutation, useQueryClient } from 'react-query';
import { DishModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useDishDeleteMutation = (orderSlug: string, dish: DishModel) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', orderSlug, 'dishes'];
  return useMutation(
    async () => {
      const { data } = await axios.delete(
        `/api/orders/slug/${orderSlug}/dishes/${dish.id}`
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
