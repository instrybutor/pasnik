import { useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  AddDishDto,
  DishModel,
  DishPurgatoryModal,
} from '@pasnik/api/data-transfer';

import * as service from '../order-store/order.service';
import { PagesOrderProps } from '../pages-order';

export const useOrderFacade = () => {
  const { slug } = useParams<PagesOrderProps>();
  const queryClient = useQueryClient();

  const orderKey = ['fetch', 'order', slug];

  const orderQuery = useQuery(orderKey, () => service.fetchOrder(slug), {
    enabled: Boolean(slug),
  });

  const orderDishesKey = ['fetch', 'order', orderQuery?.data?.id, 'dishes'];

  const dishesQuery = useQuery(
    orderDishesKey,
    ({ queryKey }) => {
      const [, , orderId] = queryKey;

      return service.fetchDishes(orderId!);
    },
    {
      refetchInterval: 5000,
      enabled: Boolean(slug) && Boolean(orderQuery?.data?.id),
    }
  );

  const markAsDeliveredMutation = useMutation((orderId: string) =>
    service.markAsDelivered(orderId)
  );
  const markAsOrderedMutation = useMutation((orderId: string) =>
    service.markAsOrdered(orderId)
  );
  const markAsOpenMutation = useMutation((orderId: string) =>
    service.markAsOpen(orderId)
  );
  const markAsClosedMutation = useMutation((orderId: string) =>
    service.markAsClosed(orderId)
  );

  const dishUpdate = useMutation(
    ({
      orderId,
      dishId,
      payload,
    }: {
      orderId: string;
      dishId: number;
      payload: AddDishDto;
    }) => service.updateDish(orderId, dishId, payload),
    {
      onMutate: async ({ dishId, payload }) => {
        await queryClient.cancelQueries(orderDishesKey);

        const prevDishes =
          queryClient.getQueryData<DishModel[]>(orderDishesKey);
        queryClient.setQueryData<DishModel[]>(orderDishesKey, (prev = []) => {
          const index = prev?.findIndex((item) => item.id === dishId);

          return [
            ...prev.slice(0, index),
            {
              ...prev[index!],
              ...payload,
            },
            ...prev.slice(index + 1),
          ];
        });

        return { prevDishes };
      },
      onSettled: () => {
        queryClient.invalidateQueries(orderDishesKey);
      },
    }
  );

  const dishDelete = useMutation(
    ({ orderId, dishId }: { orderId: string; dishId: number }) =>
      service.deleteDish(orderId, dishId),
    {
      onMutate: async ({ dishId }) => {
        await queryClient.cancelQueries(orderDishesKey);

        const prevDishes =
          queryClient.getQueryData<DishModel[]>(orderDishesKey);
        queryClient.setQueryData<DishModel[]>(orderDishesKey, (prev = []) => {
          const index = prev?.findIndex((item) => item.id === dishId);

          return [...prev.slice(0, index), ...prev.slice(index + 1)];
        });

        return { prevDishes };
      },
      onSettled: () => {
        queryClient.invalidateQueries(orderDishesKey);
      },
    }
  );

  const dishAdd = useMutation(
    ({ orderId, payload }: { orderId: string; payload: AddDishDto }) =>
      service.addDish(orderId, payload),
    {
      onMutate: async ({ payload }) => {
        await queryClient.cancelQueries(orderDishesKey);

        const prevDishes =
          queryClient.getQueryData<DishPurgatoryModal[]>(orderDishesKey);
        queryClient.setQueryData<DishPurgatoryModal[]>(
          orderDishesKey,
          (prev = []) => [
            ...prev,
            {
              ...payload,
              createdAt: new Date().toISOString(),
            },
          ]
        );

        return { prevDishes };
      },
      onSettled: () => {
        queryClient.invalidateQueries(orderDishesKey);
      },
    }
  );

  return {
    dishAdd,
    dishUpdate,
    dishDelete,
    orderQuery,
    dishesQuery,
    markAsDeliveredMutation,
    markAsOrderedMutation,
    markAsOpenMutation,
    markAsClosedMutation,
  };
};
