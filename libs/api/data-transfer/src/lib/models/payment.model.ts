import { UserModel } from '@pasnik/api/data-transfer';

export interface PaymentModel {
  id: number;
  user: UserModel;
  payer: UserModel;
  balanceCents: number;
}
