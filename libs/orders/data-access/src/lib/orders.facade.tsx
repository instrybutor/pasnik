import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';

import { createOrderStore } from './orders.store';
import * as service from './orders.service';
import { useCallback } from 'react';

export const useOrdersFacade = () => {
  const store = createOrderStore();

  const fetchOrders = useCallback(async (): Promise<OrderModel[]> => {
    const orders = await service.fetchOrders();
    store.setOrders(orders);

    return orders;
  }, [store]);

  const createOrder = useCallback(
    async (payload: CreateOrderDto) => {
      const order = await service.createOrder(payload);
      store.addOrder(order);

      return order;
    },
    [store]
  );

  return {
    createOrder,
    fetchOrders,
  };
};
