import { UserModel } from '@pasnik/api/data-transfer';

export enum InvitationStatus {
  REQUESTED = 'requested',
  APPROVED = 'approved',
}

export interface InvitationModel {
  email: string;
  createdAt: string;
  updatedAt: string;
  status: InvitationStatus;
  acceptedBy?: UserModel;
}
