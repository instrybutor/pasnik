import {
  ExpenseModel,
  UserModel,
  WorkspaceUserModel,
} from '@pasnik/api/data-transfer';
import { Dictionary } from '@pasnik/shared/utils';
import { BaseExpenseShare } from './expense-shares';

export interface ExpensesButtonProps {
  users: Dictionary<WorkspaceUserModel<UserModel>>;
  expense: Pick<ExpenseModel, 'priceCents'>;
  shares: BaseExpenseShare[];
}
