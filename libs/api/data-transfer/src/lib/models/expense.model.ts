import { WorkspaceUserModel } from './workspace-user.model';
import { ShareModel } from './share.model';
import { OperationModel } from './operation.model';

export interface ExpenseModel {
  id: number;
  name: string;
  workspaceUserId: number;
  priceCents: number;
  shares: ShareModel[];
  workspaceUser?: WorkspaceUserModel;
  operation?: OperationModel;
}
