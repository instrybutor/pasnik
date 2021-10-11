import {
  CreateOrderDto,
  OrderModel,
  UpdateOrderDto,
} from '@pasnik/api/data-transfer';

import { createOrdersStore } from './orders.store';
import * as service from './orders.service';
import { useCallback } from 'react';

export const useOrdersFacade = () => {
  const {
    setOrders,
    addOrder,
    updateOrder: updateOrderState,
  } = createOrdersStore();

  const fetchOrders = useCallback(async (): Promise<OrderModel[]> => {
    const orders = await service.fetchOrders();
    setOrders(orders);

    return orders;
  }, [setOrders]);

  const fetchOrder = useCallback(async (orderId: string) => {
    const order = await service.fetchOrderById(orderId);

    return order;
  }, []);

  const updateOrder = useCallback(
    async (orderId: string, payload: UpdateOrderDto) => {
      const order = await service.updateOrder(orderId, payload);

      updateOrderState(order);

      return order;
    },
    [updateOrderState]
  );

  const createOrder = useCallback(
    async (payload: CreateOrderDto) => {
      const order = await service.createOrder(payload);
      addOrder(order);

      return order;
    },
    [addOrder]
  );

  return {
    createOrder,
    updateOrder,
    fetchOrder,
    fetchOrders,
  };
};
