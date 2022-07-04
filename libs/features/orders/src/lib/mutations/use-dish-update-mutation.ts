import { useMutation, useQueryClient } from 'react-query';
import { AddDishDto, DishModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useDishUpdateMutation = (orderSlug: string, dish: DishModel) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', orderSlug, 'dishes'];
  return useMutation(
    async (addDishDto: AddDishDto) => {
      const { data } = await axios.put<DishModel>(
        `/api/orders/slug/${orderSlug}/dishes/${dish.id}`,
        addDishDto
      );
      return data;
    },
    {
      onMutate: async (updatedDish) => {
        await queryClient.cancelQueries(queryKey);

        const prevDishes = queryClient.getQueryData<DishModel[]>(queryKey);
        queryClient.setQueryData<DishModel[]>(queryKey, (prev = []) => {
          const index = prev?.findIndex((item) => item.id === dish.id);

          return [
            ...prev.slice(0, index),
            {
              ...prev[index!],
              ...updatedDish,
            },
            ...prev.slice(index + 1),
          ];
        });

        return { prevDishes };
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
