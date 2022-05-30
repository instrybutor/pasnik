import { useMutation, useQueryClient } from 'react-query';
import { AddDishDto, DishModel, OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';
import { useOrderDishes } from '../queries';

export const useDishAddMutation = (order: OrderModel) => {
  const dishesQuery = useOrderDishes(order);
  const queryClient = useQueryClient();
  const queryKey = ['orders', order.slug, 'dishes'];
  return useMutation(
    async (addDishDto: AddDishDto) => {
      const { data } = await axios.post<DishModel>(
        `/api/orders/slug/${order.slug}/dishes`,
        addDishDto
      );
      return data;
    },
    {
      onMutate: async (dish) => {
        await queryClient.cancelQueries(queryKey);

        const prevDishes =
          queryClient.getQueryData<Partial<AddDishDto>[]>(queryKey);
        queryClient.setQueryData<Partial<AddDishDto>[]>(
          queryKey,
          (prev = []) => [
            ...prev,
            {
              ...dish,
              id: new Date().getTime(),
              createdAt: new Date().toISOString(),
            },
          ]
        );

        return { prevDishes };
      },
      onSuccess: () => {
        dishesQuery.refetch();
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
