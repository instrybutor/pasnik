import { useCallback, useEffect, useState } from 'react';

import {
  AddDishDto,
  DishModel,
  OrderModel,
  OrderStatus,
} from '@pasnik/api/data-transfer';

import { useOrderFacade } from '../order-store/order.facade';

interface Props {
  order: OrderModel | null;
}

export const useOrderDishes = ({ order }: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const { dishUpdate, dishDelete, dishAdd } = useOrderFacade();

  const inProgress = order?.status === OrderStatus.InProgress;

  const addDishClickHandler = useCallback(() => {
    setIsAdding(true);
  }, []);

  const onAddCancel = useCallback(() => setIsAdding(false), []);

  const addDishHandler = useCallback(
    async (data: AddDishDto) => {
      if (!order) {
        return;
      }

      await dishAdd.mutateAsync({
        order,
        payload: {
          ...data,
          priceCents: data.priceCents * 100,
        },
      });

      setIsAdding(false);
    },
    [dishAdd, order]
  );

  const duplicateDish = useCallback(
    async (payload: DishModel) => {
      if (!order) {
        return;
      }

      await dishAdd.mutateAsync({
        order,
        payload,
      });
    },
    [dishAdd, order]
  );

  const deleteDishHandler = useCallback(
    async (dish: DishModel) => {
      if (!order) {
        return;
      }

      await dishDelete.mutateAsync({ order, dishId: dish.id });
    },
    [dishDelete, order]
  );

  const updateDishHandler = useCallback(
    async (dishDto: AddDishDto, dish: DishModel) => {
      if (!order) {
        return;
      }

      await dishUpdate.mutateAsync({
        order,
        dishId: dish.id,
        payload: {
          ...dishDto,
          priceCents: dishDto.priceCents * 100,
        },
      });

      setUpdateId(null);
    },
    [dishUpdate, order]
  );

  const editClickHandler = useCallback(async (dish: DishModel) => {
    setUpdateId(dish.id);
  }, []);

  const cancelUpdateHandler = useCallback(() => {
    setUpdateId(null);
  }, []);

  useEffect(() => {
    setUpdateId(null);
    setIsAdding(false);
  }, [inProgress]);

  return {
    inProgress,
    isAdding,
    updateId,
    duplicateDish,
    onAddCancel,
    cancelUpdateHandler,
    editClickHandler,
    updateDishHandler,
    deleteDishHandler,
    addDishClickHandler,
    addDishHandler,
  };
};
