import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';

import { createOrdersStore } from './orders.store';
import * as service from './orders.service';
import { useCallback } from 'react';

export const useOrdersFacade = () => {
  const store = createOrdersStore();

  const fetchOrder = useCallback((slug) => {
    return service.fetchOrder(slug);
  }, []);

  const fetchOrders = useCallback(async (): Promise<OrderModel[]> => {
    const orders = await service.fetchOrders();
    store.setOrders(orders);

    return orders;
  }, [store.setOrders]);

  const createOrder = useCallback(
    async (payload: CreateOrderDto) => {
      const order = await service.createOrder(payload);
      store.addOrder(order);

      return order;
    },
    [store.addOrder]
  );

  const updateOrder = useCallback(
    async (slug, payload: Partial<OrderModel>) => {
      const order = await service.updateOrder(slug, payload);
      store.updateOrder(order);

      return order;
    },
    [store.updateOrder]
  );

  return {
    createOrder,
    updateOrder,
    fetchOrders,
    fetchOrder,
  };
};
