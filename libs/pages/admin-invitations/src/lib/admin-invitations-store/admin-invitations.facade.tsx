import { InvitationModel, InvitationStatus } from '@pasnik/api/data-transfer';

import { useAdminInvitationsStore } from './admin-invitations.store';
import * as service from './admin-invitations.service';
import { useCallback } from 'react';

export const useAdminInvitationsFacade = () => {
  const store = useAdminInvitationsStore();

  const fetchInvitations = useCallback(async (): Promise<InvitationModel[]> => {
    const invitations = await service.fetchInvitations();
    store.setInvitations(invitations);

    return invitations;
  }, [store]);

  const changeInvitationStatus = useCallback(
    async (
      email: string,
      status: InvitationStatus
    ): Promise<InvitationModel> => {
      const invitation = await service.changeInvitationStatus(email, {
        status,
      });
      store.setInvitation(invitation);
      return invitation;
    },
    [store]
  );
  return {
    fetchInvitations,
    changeInvitationStatus,
  };
};
