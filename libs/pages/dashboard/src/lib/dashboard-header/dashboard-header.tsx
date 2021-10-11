import { OfficeBuildingIcon } from '@heroicons/react/outline';
import { useAuth } from '@pasnik/shared/utils-auth';
import { UserAvatar, UserName } from '@pasnik/components';

/* eslint-disable-next-line */
export interface DashboardHeaderProps {}

export function DashboardHeader(props: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0">
            {/* Profile */}
            <div className="flex items-center">
              <div className="hidden sm:block">
                <UserAvatar user={user!} size="xxlg" />
              </div>
              <div>
                <div className="flex items-center">
                  <div className="sm:hidden">
                    <UserAvatar user={user!} size="xxlg" />
                  </div>
                  <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                    Witaj, <UserName user={user} />
                  </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt className="sr-only">Company</dt>
                  <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                    <OfficeBuildingIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Instrybutor
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Wyślij transfer
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Rozlicz się
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
