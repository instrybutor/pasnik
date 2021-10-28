import create from 'zustand';

import type {
  AddDishDto,
  DishModel,
  OrderModel,
} from '@pasnik/api/data-transfer';

import * as service from './order.service';

interface OrderState {
  order: OrderModel | null;
  dishes: Record<number, DishModel> | null;
  dishesIds: number[];
  isOrderLoading: boolean;
  isDishesLoading: boolean;

  addDish: (payload: AddDishDto) => Promise<DishModel>;
  fetchDishes: () => Promise<DishModel[]>;
  fetchOrder: (slug: string) => Promise<OrderModel>;
  deleteDish: (dishId: number) => Promise<void>;
  setPayer: (payerId: number) => Promise<OrderModel>;
  markAsClosed: () => Promise<OrderModel>;
  markAsOpen: () => Promise<OrderModel>;
  markAsOrdered: () => Promise<OrderModel>;
  markAsPaid: (payerId: number) => Promise<OrderModel>;
  markAsDelivered: () => Promise<OrderModel>;
  updateDish: (dishId: number, payload: AddDishDto) => Promise<DishModel>;
  reset: () => void;
}
const removeKey = (
  key: number,
  { [key]: _, ...rest }: Record<number, DishModel>
) => rest;

const initialState = {
  order: null,
  dishes: {},
  dishesIds: [],
  isDishesLoading: true,
  isOrderLoading: true,
};

export const useOrderStore = create<OrderState>((set, getState) => ({
  ...initialState,

  reset: () => set(initialState),

  fetchDishes: async () => {
    const { order } = getState();

    set({ isDishesLoading: true });

    const dishes = await service.fetchDishes(order!.id);

    set((state) => ({
      ...state,
      isDishesLoading: false,
      dishesIds: dishes.map((dish) => dish.id),
      dishes: dishes.reduce(
        (collection, dish) => ({
          ...collection,
          [dish.id]: dish,
        }),
        {}
      ),
    }));

    return dishes;
  },

  addDish: async (payload: AddDishDto) => {
    const { order } = getState();

    const dish = await service.addDish(order!.id, payload);

    set((state) => ({
      ...state,
      dishesIds: [...state.dishesIds, dish.id],
      dishes: {
        ...state.dishes,
        [dish.id]: dish,
      },
    }));

    return dish;
  },
  deleteDish: async (dishId: number) => {
    const { order } = getState();
    await service.deleteDish(order!.id, dishId);

    set((state) => ({
      ...state,
      dishesIds: state.dishesIds.filter((id) => id !== dishId),
      dishes: removeKey(dishId, state.dishes ?? {}),
    }));
  },
  updateDish: async (dishId: number, payload: AddDishDto) => {
    const { order } = getState();

    const dish = await service.updateDish(order!.id, dishId, payload);

    set((state) => ({
      ...state,
      dishes: {
        ...state.dishes,
        [dishId]: dish,
      },
    }));

    return dish;
  },
  fetchOrder: async (slug: string) => {
    set({ isOrderLoading: true });

    const order = await service.fetchOrder(slug);

    set((state) => ({
      ...state,
      isOrderLoading: false,
      order,
    }));

    return order;
  },
  markAsClosed: async () => {
    const { order } = getState();
    set({ isOrderLoading: true });

    const newOrder = await service.markAsClosed(order!.id);

    set((state) => ({
      ...state,
      isOrderLoading: false,
      order: newOrder,
    }));

    return newOrder;
  },
  markAsOpen: async () => {
    const { order } = getState();

    set({ isOrderLoading: true });

    const newOrder = await service.markAsOpen(order!.id);

    set((state) => ({
      ...state,
      isOrderLoading: false,
      order: newOrder,
    }));

    return newOrder;
  },
  markAsOrdered: async () => {
    const { order } = getState();

    set({ isOrderLoading: true });

    const newOrder = await service.markAsOrdered(order!.id);

    set((state) => ({
      ...state,
      isOrderLoading: false,
      order: newOrder,
    }));

    return newOrder;
  },
  markAsPaid: async (payerId: number) => {
    const { order } = getState();

    set({ isOrderLoading: true });

    const newOrder = await service.markAsPaid(order!.id, payerId);

    set((state) => ({
      ...state,
      isOrderLoading: false,
      order: newOrder,
    }));

    return newOrder;
  },
  markAsDelivered: async () => {
    const { order } = getState();

    set({ isOrderLoading: true });

    const newOrder = await service.markAsDelivered(order!.id);

    set((state) => ({
      ...state,
      isOrderLoading: false,
      order: newOrder,
    }));

    return newOrder;
  },
  setPayer: async (payerId: number) => {
    const { order } = getState();

    set({ isOrderLoading: true });

    const newOrder = await service.setPayer(order!.id, { payerId });

    set((state) => ({
      ...state,
      isOrderLoading: false,
      order: newOrder,
    }));

    return newOrder;
  },
}));
