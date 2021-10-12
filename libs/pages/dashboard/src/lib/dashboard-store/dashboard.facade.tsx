import { OrderModel } from '@pasnik/api/data-transfer';

import { useDashboardStore } from './dashboard.store';
import * as service from './dashboard.service';
import { useCallback } from 'react';

export const useDashboardFacade = () => {
  const store = useDashboardStore();

  const fetchActiveOrders = useCallback(async (): Promise<OrderModel[]> => {
    const orders = await service.fetchActiveOrders();
    store.setOrders(orders);

    return orders;
  }, [store]);
  return {
    fetchActiveOrders,
  };
};
