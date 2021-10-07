import create from 'zustand';

import type { OrderModel } from '@pasnik/api/data-transfer';

interface OrderState {
  order: OrderModel | null;

  setOrder: (order: OrderModel) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,

  setOrder: (order: OrderModel) => {
    set((state) => ({
      ...state,
      order,
    }));
  },
}));
