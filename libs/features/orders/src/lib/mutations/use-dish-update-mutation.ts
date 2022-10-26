import { useMutation, useQueryClient } from 'react-query';
import { AddDishDto, ExpenseModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useDishUpdateMutation = (
  orderSlug: string,
  expense: ExpenseModel
) => {
  const queryClient = useQueryClient();
  const queryKey = ['orders', orderSlug, 'dishes'];
  return useMutation(
    async (addDishDto: AddDishDto) => {
      const { data } = await axios.put<ExpenseModel>(
        `/api/orders/slug/${orderSlug}/dishes/${expense.id}`,
        addDishDto
      );
      return data;
    },
    {
      onMutate: async (updatedDish) => {
        await queryClient.cancelQueries(queryKey);

        const prevDishes = queryClient.getQueryData<ExpenseModel[]>(queryKey);
        queryClient.setQueryData<ExpenseModel[]>(queryKey, (prev = []) => {
          const index = prev?.findIndex((item) => item.id === expense.id);

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
