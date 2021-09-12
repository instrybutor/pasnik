import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';

import { createOrderStore } from './orders.store';
import * as service from './orders.service';

export const useOrdersFacade = () => {
  const store = createOrderStore();

  const fetchOrders = async (): Promise<OrderModel[]> => {
    const orders = await service.fetchOrders();
    store.setOrders(orders);

    return orders;
  };

  const createOrder = async (payload: CreateOrderDto) => {
    const order = await service.createOrder(payload);
    store.addOrder(order);

    return order;
  };

  return {
    createOrder,
    fetchOrders,
  };
};
