import {
  ChangeInvitationStatusDto,
  InvitationModel,
} from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const fetchInvitations = () =>
  axios
    .get<InvitationModel[]>('/api/admin/invitations')
    .then(({ data }) => data);

export const changeInvitationStatus = (
  email: string,
  changeInvitationStatusDto: ChangeInvitationStatusDto
) =>
  axios
    .post<InvitationModel>(
      `/api/admin/invitations/${email}/change-status`,
      changeInvitationStatusDto
    )
    .then(({ data }) => data);
