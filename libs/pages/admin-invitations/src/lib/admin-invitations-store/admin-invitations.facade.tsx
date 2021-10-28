import { useAdminInvitationsStore } from './admin-invitations.store';

export const useAdminInvitationsFacade = () => {
  const store = useAdminInvitationsStore();

  return store;
};
