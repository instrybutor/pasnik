import { InvitationModel, InvitationStatus } from '@pasnik/api/data-transfer';
import { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { UserName } from '@pasnik/components';

export interface AdminInvitationStatusProps {
  invitation: InvitationModel;
}

const statusMap: Record<
  InvitationStatus,
  (invitation: InvitationModel) => ReactNode
> = {
  [InvitationStatus.NO_INVITATION]: () => {
    throw new Error('Should not happen');
  },
  [InvitationStatus.PENDING]: () => 'Oczekujące',
  [InvitationStatus.APPROVED]: (invitation: InvitationModel) => (
    <span>
      Zatwierdzone przez <UserName user={invitation.changedBy} />
    </span>
  ),
  [InvitationStatus.REJECTED]: (invitation: InvitationModel) => (
    <span>
      Odrzucone przez <UserName user={invitation.changedBy} />
    </span>
  ),
  [InvitationStatus.REGISTERED]: (invitation: InvitationModel) => (
    <span>
      Zarejestrowany jako <UserName user={invitation.user} />
    </span>
  ),
};

const colorMap: Record<InvitationStatus, string> = {
  [InvitationStatus.NO_INVITATION]: 'bg-gray-100 text-black',
  [InvitationStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [InvitationStatus.REJECTED]: 'bg-red-100 text-red-800',
  [InvitationStatus.APPROVED]: 'bg-green-100 text-green-800',
  [InvitationStatus.REGISTERED]: 'bg-green-100 text-green-800',
};

export default function AdminInvitationStatus({
  invitation,
}: AdminInvitationStatusProps) {
  const formattedStatus = useMemo(
    () => statusMap[invitation.status](invitation),
    [invitation]
  );

  const color = useMemo(() => colorMap[invitation.status], [invitation]);

  return (
    <div
      className={classNames(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        color
      )}
    >
      {formattedStatus}
    </div>
  );
}
