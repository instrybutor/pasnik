import { AdminInvitationsHeader } from './admin-invitations-header/admin-invitations-header';
import AdminInvitationList from './admin-invitation-list/admin-invitation-list';
import { useEffect } from 'react';
import { useAdminInvitationsStore } from './admin-invitations-store/admin-invitations.store';
import { useAdminInvitationsFacade } from './admin-invitations-store/admin-invitations.facade';

/* eslint-disable-next-line */
export interface PagesAdminInvitationsProps {}

export function PagesAdminInvitations(props: PagesAdminInvitationsProps) {
  const invitations = useAdminInvitationsStore((state) =>
    Object.values(state.entities)
  );
  const { fetchInvitations, updateInvitation } = useAdminInvitationsFacade();

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return (
    <>
      <header className="bg-white shadow">
        <AdminInvitationsHeader />
      </header>
      <main className="flex-grow">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdminInvitationList
              invitations={invitations}
              changeStatus={updateInvitation}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default PagesAdminInvitations;
