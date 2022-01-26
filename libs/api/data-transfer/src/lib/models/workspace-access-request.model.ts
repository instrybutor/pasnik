import { WorkspaceModel } from './workspace.model';
import { UserModel } from './user.model';

export enum WorkspaceAccessRequestStatus {
  Requested = 'requested',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface WorkspaceAccessRequestModel {
  kind: 'WorkspaceAccessRequestModel';

  id: number;
  createdAt: string;
  updatedAt: string;
  workspace: WorkspaceModel;
  user: UserModel;
  status: WorkspaceAccessRequestStatus;
}
