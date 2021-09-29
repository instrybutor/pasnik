import { UserModel } from './user.model';

export interface DishModel {
  name: string;
  priceCents: number;
  user: UserModel;
  paid: boolean;
}
