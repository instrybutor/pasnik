import create from 'zustand';

import type { OrderModel } from '@pasnik/api/data-transfer';

import * as service from './orders.service';

interface OrdersState {
  entities: Record<string, OrderModel> | null;
  ids: string[];
  isFetching: boolean;

  setOrders: (orders: OrderModel[]) => void;
  fetchOrders: () => Promise<OrderModel[]>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  entities: {},
  ids: [],
  isFetching: false,

  setOrders: async (orders: OrderModel[]) => {
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

  fetchOrders: async () => {
    set({ isFetching: true });

    try {
      const orders = await service.fetchOrders();
      set({ isFetching: false });

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

      return orders;
    } catch (error) {
      set({ isFetching: false });

      return [];
    }
  },
}));
