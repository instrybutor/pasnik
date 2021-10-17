import { UserModel } from './user.model';

export interface PaymentModel {
  id: number;
  user: UserModel;
  payer: UserModel;
  balanceCents: number;
}
