import { UserModel } from './user.model';

export enum InvitationStatus {
  NO_INVITATION = 'no-invitation',
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
