import create from 'zustand';

import type { OrderModel } from '@pasnik/api/data-transfer';

interface OrdersState {
  entities: Record<string, OrderModel> | null;
  ids: string[];

  setOrders: (orders: OrderModel[]) => void;
  addOrder: (order: OrderModel) => void;
  updateOrder: (order: OrderModel) => void;
}

export const createOrdersStore = create<OrdersState>((set) => ({
  entities: null,
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

  addOrder: (order: OrderModel) => {
    set((state) => ({
      ids: [...state.ids, order.id],
      entities: {
        ...state.entities,
        [order.id]: order,
      },
    }));
  },

  updateOrder: (order: OrderModel) => {
    set((state) => ({
      ...state,
      entities: {
        ...state.entities,
        [order.id]: order,
      },
    }));
  },
}));
