import {
  ChangeInvitationStatusDto,
  InvitationModel,
} from '@pasnik/api/data-transfer';
import { authFetch } from '@pasnik/shared/utils-auth';

export const fetchInvitations = () =>
  authFetch<InvitationModel[]>(`/api/admin/invitations`);

export const changeInvitationStatus = (
  email: string,
  changeInvitationStatusDto: ChangeInvitationStatusDto
) =>
  authFetch<InvitationModel>(`/api/admin/invitations/${email}/change-status`, {
    method: 'POST',
    body: JSON.stringify(changeInvitationStatusDto),
  });
