import create from 'zustand';

import type { OrderModel } from '@pasnik/api/data-transfer';

import * as service from './dashboard.service';

interface DashboardStore {
  entities?: Record<string, OrderModel>;
  ids: string[];
  isFetching: boolean;
  balance: number;
  orders: number;
  transfers: number;

  setOrders: (orders: OrderModel[]) => void;
  fetchActiveOrders: () => Promise<OrderModel[]>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  entities: {},
  ids: [],
  balance: 0,
  orders: 0,
  transfers: 0,
  isFetching: true,

  setOrders: (orders: OrderModel[]) => {
    set((state) => ({
      ...state,
      isFetching: false,
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

  fetchActiveOrders: async () => {
    set({ isFetching: true });

    const orders = await service.fetchActiveOrders();

    try {
      set((state) => ({
        ...state,
        isFetching: false,
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
