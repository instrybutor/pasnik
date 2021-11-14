import { UserModel } from './user.model';

export enum InvitationStatus {
  INVITATION_DISABLED = 'invitation-disabled',
  INVITATION_REQUIRED = 'invitation-required',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REGISTERED = 'registered',
}

export interface InvitationModel {
  email: string;
  createdAt: string;
  updatedAt: string;
  status: InvitationStatus;
  user?: UserModel;
  changedBy?: UserModel;
}
