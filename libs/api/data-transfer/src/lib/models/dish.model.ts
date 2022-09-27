import { ExpenseModel } from './expense.model';

export interface DishModel {
  id: number;
  orderId: string;
  expense: ExpenseModel;
  expenseId: number;
}
