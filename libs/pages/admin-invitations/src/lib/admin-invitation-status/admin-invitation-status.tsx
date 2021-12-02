import { InvitationModel, InvitationStatus } from '@pasnik/api/data-transfer';
import { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { UserName } from '@pasnik/components';
import { t } from 'i18next';

export interface AdminInvitationStatusProps {
  invitation: InvitationModel;
}

const statusMap: Partial<
  Record<InvitationStatus, (invitation: InvitationModel) => ReactNode>
> = {
  [InvitationStatus.PENDING]: () => t('invitation.status.pending'),
  [InvitationStatus.APPROVED]: (invitation: InvitationModel) => (
    <span>
      {t('invitation.status.approvedBy')}{' '}
      <UserName user={invitation.changedBy} />
    </span>
  ),
  [InvitationStatus.REJECTED]: (invitation: InvitationModel) => (
    <span>
      {t('invitation.status.rejectedBy')}{' '}
      <UserName user={invitation.changedBy} />
    </span>
  ),
  [InvitationStatus.REGISTERED]: (invitation: InvitationModel) => (
    <span>
      {t('invitation.status.registeredAs')} <UserName user={invitation.user} />
    </span>
  ),
};

const colorMap: Partial<Record<InvitationStatus, string>> = {
  [InvitationStatus.INVITATION_REQUIRED]: 'bg-gray-100 text-black',
  [InvitationStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [InvitationStatus.REJECTED]: 'bg-red-100 text-red-800',
  [InvitationStatus.APPROVED]: 'bg-green-100 text-green-800',
  [InvitationStatus.REGISTERED]: 'bg-green-100 text-green-800',
};

export default function AdminInvitationStatus({
  invitation,
}: AdminInvitationStatusProps) {
  const formattedStatus = useMemo(() => {
    const status = statusMap[invitation.status];
    if (!status) {
      throw new Error(`Wrong status=${invitation.status}`);
    }
    return status(invitation);
  }, [invitation]);

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
