import { CalendarIcon, MailIcon } from '@heroicons/react/solid';
import { InvitationModel, InvitationStatus } from '@pasnik/api/data-transfer';
import { DateFormat } from '@pasnik/components';
import AdminInvitationStatus from '../admin-invitation-status/admin-invitation-status';
import AdminInvitationActions from '../admin-invitation-actions/admin-invitation-actions';

export interface AdminInvitationListProps {
  invitations: InvitationModel[];
  changeStatus: (email: string, status: InvitationStatus) => void;
}

export default function AdminInvitationList({
  invitations,
  changeStatus,
}: AdminInvitationListProps) {
  return (
    <div className="bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {invitations.map((invitation) => (
          <li key={invitation.email}>
            <div className="block hover:bg-gray-50">
              <div className="flex items-center px-6 py-4">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="min-w-0 flex-1 px-2 md:grid md:grid-cols-2 md:gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MailIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="truncate">{invitation.email}</span>
                    </div>
                    <div className="hidden md:block">
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CalendarIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          Wysłane{' '}
                          <DateFormat
                            date={invitation.createdAt}
                            format="LLL"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <AdminInvitationStatus invitation={invitation} />
                </div>
                {!invitation.user && (
                  <div className="ml-2 flex">
                    <AdminInvitationActions
                      email={invitation.email}
                      changeStatus={changeStatus}
                    />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
