import { InvitationModel, InvitationStatus } from '@pasnik/api/data-transfer';
import { useCallback } from 'react';
import classNames from 'classnames';
import { UserName } from '@pasnik/components';

export interface AdminInvitationStatusProps {
  invitation: InvitationModel;
}

export default function AdminInvitationStatus({
  invitation,
}: AdminInvitationStatusProps) {
  const formatStatus = useCallback(() => {
    switch (invitation.status) {
      case InvitationStatus.APPROVED:
        return (
          <span>
            Zatwierdzone przez <UserName user={invitation.changedBy} />
          </span>
        );
      case InvitationStatus.PENDING:
        return 'Oczekujące';
      case InvitationStatus.REJECTED:
        return (
          <span>
            Odrzucone przez <UserName user={invitation.changedBy} />
          </span>
        );
      case InvitationStatus.REGISTERED:
        return (
          <span>
            Zarejestrowany jako <UserName user={invitation.user} />
          </span>
        );
    }
  }, [invitation]);

  const getColor = useCallback(() => {
    if (invitation.user) {
      return 'bg-green-100 text-green-800';
    }
    switch (invitation.status) {
      case InvitationStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case InvitationStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case InvitationStatus.REJECTED:
        return 'bg-red-100 text-red-800';
    }
    return 'bg-gray-100 text-black';
  }, [invitation]);
  return (
    <div
      className={classNames(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        getColor()
      )}
    >
      {formatStatus()}
    </div>
  );
}
