import { useMutation, useQueryClient } from 'react-query';
import { ExpenseModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const useDishDeleteMutation = (
  orderSlug: string,
  dish: ExpenseModel
) => {
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

        const prevDishes = queryClient.getQueryData<ExpenseModel[]>(queryKey);
        queryClient.setQueryData<ExpenseModel[]>(queryKey, (prev = []) =>
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
