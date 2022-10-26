import { WorkspaceUserModel } from './workspace-user.model';
import { ExpenseModel } from './expense.model';
import { PaymentModel } from './payment.model';
import { WorkspaceModel } from './workspace.model';

export interface OperationModel {
  id: number;
  name: string;
  workspaceUserId: number;
  workspaceId: number;
  priceCents: number;

  workspaceUser?: WorkspaceUserModel;
  workspace?: WorkspaceModel;
  expenses?: ExpenseModel[];
  payments?: PaymentModel[];
}
