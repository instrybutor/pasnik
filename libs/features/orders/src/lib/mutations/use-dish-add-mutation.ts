import { useMutation, useQueryClient } from 'react-query';
import { AddDishDto, DishModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useDishAddMutation = (orderSlug: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', orderSlug, 'dishes'];
  return useMutation(
    async (addDishDto: AddDishDto) => {
      const { data } = await axios.post<DishModel>(
        `/api/orders/slug/${orderSlug}/dishes`,
        addDishDto
      );
      return data;
    },
    {
      onMutate: async (dish) => {
        await queryClient.cancelQueries(queryKey);

        const prevDishes =
          queryClient.getQueryData<Partial<DishModel>[]>(queryKey);
        queryClient.setQueryData<Partial<DishModel>[]>(
          queryKey,
          (prev = []) => [
            ...prev,
            {
              id: new Date().getTime(),
              createdAt: new Date().toISOString(),
              expense: {
                id: -1,
                name: dish.name,
                priceCents: dish.priceCents,
                shares: [],
                workspaceUserId: -1,
              },
              expenseId: -1,
              orderId: '-1',
            },
          ]
        );

        return { prevDishes };
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
