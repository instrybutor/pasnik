import { ExpenseModel } from './expense.model';

export enum ShareType {
  Amount = 'cents',
  Coefficient = 'coefficient',
}

export interface ShareModel {
  id?: number;
  workspaceUserId: number;
  share: number;
  shareType: ShareType;
  expense?: ExpenseModel;
}
