import { UserModel } from './user.model';

export interface DishModel {
  id: number;
  name: string;
  priceCents: number;
  paid: boolean;
  orderer: UserModel
}
