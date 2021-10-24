import { InvitationModel, InvitationStatus } from '@pasnik/api/data-transfer';

import { useAdminInvitationsStore } from './admin-invitations.store';
import * as service from './admin-invitations.service';
import { useCallback } from 'react';

export const useAdminInvitationsFacade = () => {
  const { setInvitations, setInvitation } = useAdminInvitationsStore();

  const fetchInvitations = useCallback(async (): Promise<InvitationModel[]> => {
    const invitations = await service.fetchInvitations();
    setInvitations(invitations);

    return invitations;
  }, [setInvitations]);

  const changeInvitationStatus = useCallback(
    async (
      email: string,
      status: InvitationStatus
    ): Promise<InvitationModel> => {
      const invitation = await service.changeInvitationStatus(email, {
        status,
      });
      setInvitation(invitation);
      return invitation;
    },
    [setInvitation]
  );
  return {
    fetchInvitations,
    changeInvitationStatus,
  };
};
