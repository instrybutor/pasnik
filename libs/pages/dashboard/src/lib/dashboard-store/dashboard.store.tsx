import create from 'zustand';
import { devtools } from 'zustand/middleware';

import type { OrderModel } from '@pasnik/api/data-transfer';

interface DashboardStore {
  entities: Record<string, OrderModel> | null;
  ids: string[];
  isLoading: boolean;

  setOrders: (orders: OrderModel[]) => void;
}

export const useDashboardStore = create<DashboardStore>(
  devtools((set) => ({
    entities: {},
    ids: [],
    balance: 0,
    orders: 0,
    transfers: 0,
    isLoading: true,

    setOrders: (orders: OrderModel[]) => {
      set((state) => ({
        ...state,
        isLoading: false,
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
  }))
);
