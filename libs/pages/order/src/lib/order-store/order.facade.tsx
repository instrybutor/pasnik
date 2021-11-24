import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  AddDishDto,
  DishModel,
  OrderModel,
  OrderStatus,
} from '@pasnik/api/data-transfer';

import * as service from '../order-store/order.service';
import { PagesOrderProps } from '../pages-order';

const REFETCH_INTERVAL = 5000;

export const useOrderFacade = () => {
  const { slug } = useParams<PagesOrderProps>();
  const queryClient = useQueryClient();

  const orderKey = useMemo(() => ['fetch', 'order', slug], [slug]);

  const orderQuery = useQuery(orderKey, () => service.fetchOrder(slug!), {
    enabled: Boolean(slug),
    refetchOnMount: false,
    refetchInterval: REFETCH_INTERVAL,
  });

  const orderDishesKey = useMemo(
    () => ['fetch', 'order', orderQuery?.data?.id, 'dishes'],
    [orderQuery?.data?.id]
  );

  const dishesQuery = useQuery(
    orderDishesKey,
    ({ queryKey }) => {
      const [, , orderId] = queryKey;

      return service.fetchDishes(orderId!);
    },
    {
      enabled: Boolean(slug) && Boolean(orderQuery?.data?.id),
      refetchOnMount: false,
      refetchInterval: REFETCH_INTERVAL,
    }
  );

  const optimisticOrderStatusUpdate = useCallback(
    (status: OrderStatus) => ({
      onMutate: async () => {
        await queryClient.cancelQueries(orderKey);

        const prevOrder = queryClient.getQueryData<OrderModel>(orderKey);
        queryClient.setQueryData<OrderModel>(orderKey, (order) => ({
          ...order!,
          status,
        }));

        return { prevOrder };
      },
      onSettled: () => {
        queryClient.invalidateQueries(orderKey);
      },
    }),
    [orderKey, queryClient]
  );

  const markAsDeliveredMutation = useMutation(
    (orderId: string) => service.markAsDelivered(orderId),
    optimisticOrderStatusUpdate(OrderStatus.Delivered)
  );
  const markAsOrderedMutation = useMutation(
    (orderId: string) => service.markAsOrdered(orderId),
    optimisticOrderStatusUpdate(OrderStatus.Ordered)
  );
  const markAsOpenMutation = useMutation(
    (orderId: string) => service.markAsOpen(orderId),
    optimisticOrderStatusUpdate(OrderStatus.InProgress)
  );
  const markAsClosedMutation = useMutation(
    (orderId: string) => service.markAsClosed(orderId),
    optimisticOrderStatusUpdate(OrderStatus.Canceled)
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
        queryClient.setQueryData<DishModel[]>(orderDishesKey, (prev = []) =>
          prev.filter((item) => item.id !== dishId)
        );

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
          queryClient.getQueryData<Partial<AddDishDto>[]>(orderDishesKey);
        queryClient.setQueryData<Partial<AddDishDto>[]>(
          orderDishesKey,
          (prev = []) => [
            ...prev,
            {
              ...payload,
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
