import {
  AddDishDto,
  DishModel,
  OrderModel,
  UserModel,
} from '@pasnik/api/data-transfer';

import { useOrderStore } from './order.store';
import * as service from './order.service';
import { useCallback } from 'react';

export const useOrderFacade = () => {
  const store = useOrderStore();

  const addDish = useCallback(
    async (orderId: string, addDishDto: AddDishDto) => {
      const dish = await service.addDish(orderId, addDishDto);
      store.addDish(dish);

      return dish;
    },
    [store.addDish]
  );

  const fetchDishes = useCallback(
    async (id: string): Promise<DishModel[]> => {
      const dishes = await service.fetchDishes(id);
      store.setDishes(dishes);

      return dishes;
    },
    [store.setDishes]
  );

  const fetchOrder = useCallback(
    async (id: string): Promise<OrderModel> => {
      const order = await service.fetchOrder(id);
      store.setOrder(order);

      return order;
    },
    [store.setOrder]
  );

  const markAsClosed = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsClosed(store.order!.id);
    store.setOrder(order);

    return order;
  }, [store.setOrder, store.order?.id]);

  const markAsOpen = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsOpen(store.order!.id);
    store.setOrder(order);

    return order;
  }, [store.setOrder, store.order?.id]);

  const markAsOrdered = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsOrdered(store.order!.id);
    store.setOrder(order);

    return order;
  }, [store.setOrder, store.order?.id]);

  const markAsPaid = useCallback(
    async (payer: UserModel): Promise<OrderModel> => {
      const order = await service.markAsPaid(store.order!.id, payer.id);
      store.setOrder(order);

      return order;
    },
    [store.setOrder, store.order?.id]
  );

  const markAsDelivered = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsDelivered(store.order!.id);
    store.setOrder(order);

    return order;
  }, [store.setOrder, store.order?.id]);

  const deleteDish = useCallback(
    async (dish: DishModel): Promise<void> => {
      await service.deleteDish(store.order!.id, dish.id);
      store.deleteDish(dish);
    },
    [store.deleteDish, store.order?.id]
  );

  const updateDish = useCallback(
    async (dishId, dto: AddDishDto): Promise<void> => {
      const dish = await service.updateDish(store.order!.id, dishId, dto);
      store.updateDish(dish);
    },
    [store.updateDish, store.order?.id]
  );

  return {
    addDish,
    fetchDishes,
    fetchOrder,
    markAsClosed,
    markAsOpen,
    markAsOrdered,
    markAsPaid,
    markAsDelivered,
    deleteDish,
    updateDish,
  };
};
