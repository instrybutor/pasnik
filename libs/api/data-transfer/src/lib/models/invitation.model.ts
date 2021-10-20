import { UserModel } from '@pasnik/api/data-transfer';

export enum InvitationStatus {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted',
}

export interface InvitationModel {
  email: string;
  createdAt: string;
  updatedAt: string;
  status: InvitationStatus;
  acceptedBy?: UserModel;
}
