import { OrderModel } from '@pasnik/api/data-transfer';

import { useOrdersStore } from './orders.store';
import * as service from './orders.service';
import { useCallback } from 'react';

export const useOrdersFacade = () => {
  const store = useOrdersStore();

  const fetchOrders = useCallback(async (): Promise<OrderModel[]> => {
    const orders = await service.fetchOrders();
    store.setOrders(orders);

    return orders;
  }, [store]);
  return {
    fetchOrders,
  };
};
