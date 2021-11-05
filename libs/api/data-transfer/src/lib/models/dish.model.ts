import { UserModel } from './user.model';

export interface DishModel {
  id: number;
  name: string;
  priceCents: number;
  createdAt: string;
  updatedAt: string;
  user: UserModel;
}

export interface DishPurgatoryModal {
  name: string;
  priceCents: number;
  createdAt: string;
}
