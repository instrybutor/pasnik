import create from 'zustand';
import { devtools } from 'zustand/middleware';

import type { DishModel, OrderModel } from '@pasnik/api/data-transfer';

interface OrderState {
  order: OrderModel | null;
  dishes: Record<number, DishModel> | null;
  dishesIds: number[];

  addDish: (dish: DishModel) => void;
  setDishes: (dishes: DishModel[]) => void;
  setOrder: (order: OrderModel) => void;
  deleteDish: (dish: DishModel) => void;
  updateDish: (dish: DishModel) => void;
}
const removeKey = (
  key: number,
  { [key]: _, ...rest }: Record<number, DishModel>
) => rest;

export const useOrderStore = create<OrderState>(
  devtools((set) => ({
    order: null,
    dishes: {},
    dishesIds: [],

    setDishes: (dishes: DishModel[]) => {
      set((state) => ({
        ...state,
        dishesIds: dishes.map((dish) => dish.id),
        dishes: dishes.reduce(
          (collection, dish) => ({
            ...collection,
            [dish.id]: dish,
          }),
          {}
        ),
      }));
    },
    addDish: (dish: DishModel) => {
      set((state) => ({
        ...state,
        dishesIds: [...state.dishesIds, dish.id],
        dishes: {
          ...state.dishes,
          [dish.id]: dish,
        },
      }));
    },
    deleteDish: (dish: DishModel) => {
      set((state) => ({
        ...state,
        dishesIds: state.dishesIds.filter((id) => id !== dish.id),
        dishes: removeKey(dish.id, state.dishes ?? {}),
      }));
    },
    updateDish: (dish: DishModel) => {
      set((state) => ({
        ...state,
        dishes: {
          ...state.dishes,
          [dish.id]: dish,
        },
      }));
    },
    setOrder: (order: OrderModel) => {
      set((state) => ({
        ...state,
        order,
      }));
    },
  }))
);
