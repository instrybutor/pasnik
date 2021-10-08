import { OrderModel, UserModel } from '@pasnik/api/data-transfer';

import { useOrderStore } from './order.store';
import * as service from './order.service';
import { useCallback } from 'react';

export const useOrderFacade = () => {
  const store = useOrderStore();

  const fetchOrder = useCallback(
    async (id: string): Promise<OrderModel> => {
      const order = await service.fetchOrder(id);
      store.setOrder(order);

      return order;
    },
    [store]
  );

  const markAsClosed = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsClosed(store.order!.id);
    store.setOrder(order);

    return order;
  }, [store]);

  const markAsOpen = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsOpen(store.order!.id);
    store.setOrder(order);

    return order;
  }, [store]);

  const markAsOrdered = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsOrdered(store.order!.id);
    store.setOrder(order);

    return order;
  }, [store]);

  const markAsPaid = useCallback(
    async (payer: UserModel): Promise<OrderModel> => {
      const order = await service.markAsPaid(store.order!.id, payer.id);
      store.setOrder(order);

      return order;
    },
    [store]
  );

  const markAsDelivered = useCallback(async (): Promise<OrderModel> => {
    const order = await service.markAsDelivered(store.order!.id);
    store.setOrder(order);

    return order;
  }, [store]);

  return {
    fetchOrder,
    markAsClosed,
    markAsOpen,
    markAsOrdered,
    markAsPaid,
    markAsDelivered,
  };
};
