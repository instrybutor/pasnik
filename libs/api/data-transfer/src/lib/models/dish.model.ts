import { UserDishModel } from './user-dish.model';

export interface DishModel {
  id: number;
  name: string;
  priceCents: number;
  usersDishes: UserDishModel[];
  createdAt: string;
  updatedAt: string;
}
