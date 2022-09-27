import { WorkspaceUserModel } from './workspace-user.model';
import { ExpenseModel } from './expense.model';
import { PaymentModel } from './payment.model';

export interface OperationModel {
  id: number;
  name: string;
  workspaceUserId: number;
  priceCents: number;

  workspaceUser?: WorkspaceUserModel;
  expenses?: ExpenseModel[];
  payments?: PaymentModel[];
}
