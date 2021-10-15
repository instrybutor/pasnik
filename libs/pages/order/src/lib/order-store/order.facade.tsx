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
  const orderId = useOrderStore((store) => store.order?.id);

  const resetStore = useCallback(() => {
    store.reset();
  }, [store.reset]);

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
    const order = await service.markAsClosed(orderId!);
    store.setOrder(order);

    return order;
  }, [store.setOrder, orderId]);

  const markAsOpen = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsOpen(orderId!);
    store.setOrder(order);

    return order;
  }, [store.setOrder, orderId]);

  const markAsOrdered = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsOrdered(orderId!);
    store.setOrder(order);

    return order;
  }, [store.setOrder, orderId]);

  const markAsPaid = useCallback(
    async (payer: UserModel): Promise<OrderModel> => {
      const order = await service.markAsPaid(orderId!, payer.id);
      store.setOrder(order);

      return order;
    },
    [store.setOrder, orderId]
  );

  const markAsDelivered = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsDelivered(orderId!);
    store.setOrder(order);

    return order;
  }, [store.setOrder, orderId]);

  const deleteDish = useCallback(
    async (dish: DishModel): Promise<void> => {
      await service.deleteDish(orderId!, dish.id);
      store.deleteDish(dish);
    },
    [store.deleteDish, orderId]
  );

  const updateDish = useCallback(
    async (dishId, dto: AddDishDto): Promise<void> => {
      const dish = await service.updateDish(orderId!, dishId, dto);
      store.updateDish(dish);
    },
    [store.updateDish, orderId]
  );

  const setPayer = useCallback(
    async (payer: UserModel): Promise<void> => {
      const order = await service.setPayer(orderId!, { payerId: payer.id });
      store.setOrder(order);
    },
    [store.setOrder, orderId]
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
    resetStore,
    setPayer,
  };
};
