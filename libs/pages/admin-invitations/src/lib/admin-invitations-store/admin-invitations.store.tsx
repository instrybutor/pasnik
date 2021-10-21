import create from 'zustand';

import type { InvitationModel } from '@pasnik/api/data-transfer';

interface AdminInvitationsState {
  entities: Record<string, InvitationModel>;
  ids: string[];

  setInvitations: (invitations: InvitationModel[]) => void;
  setInvitation: (invitation: InvitationModel) => void;
}

export const useAdminInvitationsStore = create<AdminInvitationsState>(
  (set) => ({
    entities: {},
    ids: [],

    setInvitation: (invitation: InvitationModel) => {
      set((state) => ({
        ...state,
        ids: [...state.ids, invitation.email],
        entities: {
          ...state.entities,
          [invitation.email]: invitation,
        },
      }));
    },
    setInvitations: (invitations: InvitationModel[]) => {
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
    },
  })
);
