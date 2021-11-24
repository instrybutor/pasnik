import create from 'zustand';

import type {
  CreateOrderDto,
  OrderModel,
  UpdateOrderDto,
} from '@pasnik/api/data-transfer';

import * as service from './orders.service';

interface OrdersState {
  entities: Record<string, OrderModel> | null;
  ids: string[];
  isFetching: boolean;

  fetchOrders: () => Promise<OrderModel[]>;
  fetchOrder: (slug: string) => Promise<OrderModel>;
  updateOrder: (slug: string, payload: UpdateOrderDto) => Promise<OrderModel>;
  createOrder: (
    workspaceId: number,
    payload: CreateOrderDto
  ) => Promise<OrderModel>;
}

export const createOrdersStore = create<OrdersState>((set) => ({
  entities: null,
  ids: [],
  isFetching: false,

  fetchOrders: async () => {
    set({ isFetching: true });

    const orders = await service.fetchOrders();

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
  },

  fetchOrder: async (slug: string) => {
    const order = await service.fetchOrder(slug);

    set((state) => ({
      ...state,
      ids: [...new Set([...state.ids, order.id])],
      entities: {
        [order.id]: order,
      },
    }));

    return order;
  },

  createOrder: async (workspaceId: number, payload: CreateOrderDto) => {
    const order = await service.createOrder(workspaceId, payload);

    set((state) => ({
      ...state,
      isFetching: false,
      ids: [...new Set([...state.ids, order.id])],
      entities: {
        ...state.entities,
        [order.id]: order,
      },
    }));

    return order;
  },

  updateOrder: async (slug: string, payload: UpdateOrderDto) => {
    const order = await service.updateOrder(slug, payload);

    set((state) => ({
      ...state,
      entities: {
        ...state.entities,
        [order.id]: order,
      },
    }));

    return order;
  },
}));
