import create from 'zustand';

import type { OrderModel } from '@pasnik/api/data-transfer';

interface OrdersState {
  entities: Record<string, OrderModel> | null;
  ids: string[];

  setOrders: (orders: OrderModel[]) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  entities: {},
  ids: [],

  setOrders: (orders: OrderModel[]) => {
    set((state) => ({
      ...state,
      ids: orders.map((order) => order.id),
      entities: orders.reduce(
        (collection, order) => ({
          ...collection,
          [order.id]: order,
        }),
        {}
      ),
    }));
  },
}));