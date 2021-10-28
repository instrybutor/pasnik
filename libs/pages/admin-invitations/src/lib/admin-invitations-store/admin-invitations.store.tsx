import create from 'zustand';

import type {
  InvitationModel,
  InvitationStatus,
} from '@pasnik/api/data-transfer';
import * as service from './admin-invitations.service';

interface AdminInvitationsState {
  entities: Record<string, InvitationModel>;
  ids: string[];

  fetchInvitations: () => Promise<InvitationModel[]>;
  updateInvitation: (
    email: string,
    status: InvitationStatus
  ) => Promise<InvitationModel>;
}

export const useAdminInvitationsStore = create<AdminInvitationsState>(
  (set) => ({
    entities: {},
    ids: [],

    fetchInvitations: async () => {
      const invitations = await service.fetchInvitations();

      set((state) => ({
        ...state,
        ids: invitations.map((invitation) => invitation.email),
        entities: invitations.reduce(
          (collection, invitation) => ({
            ...collection,
            [invitation.email]: invitation,
          }),
          {}
        ),
      }));

      return invitations;
    },

    updateInvitation: async (email: string, status: InvitationStatus) => {
      const invitation = await service.changeInvitationStatus(email, {
        status,
      });

      set((state) => ({
        ...state,
        ids: [...state.ids, invitation.email],
        entities: {
          ...state.entities,
          [invitation.email]: invitation,
        },
      }));

      return invitation;
    },
  })
);
