import { DishModel } from './dish.model';
import { UserModel } from './user.model';

export interface UserDishModel {
  dish: DishModel;
  user: UserModel;
  dishOwner: boolean;
}
