import { useTranslation } from 'react-i18next';
import { OfficeBuildingIcon } from '@heroicons/react/outline';
import { UserAvatar, UserName } from '@pasnik/components';
import { useCurrentWorkspace } from '@pasnik/features/workspaces';
import { useCurrentUser } from '@pasnik/auth';
import { DashboardHeaderSkeleton } from './dashboard-header-skeleton';

export function DashboardHeader() {
  const { t } = useTranslation();
  const { user } = useCurrentUser();
  const { data: workspace } = useCurrentWorkspace();

  return (
    <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <div className="hidden sm:block">
              <UserAvatar user={user} size="xxlg" />
            </div>
            <div className="max-w-full">
              <div className="flex items-center">
                <div className="sm:hidden">
                  <UserAvatar user={user} size="xxlg" />
                </div>
                <h1 className="ml-3 text-2xl font-normal leading-7 text-gray-900 sm:leading-9 sm:truncate">
                  {t('dashboard.header.hello')}, <UserName user={user} />
                </h1>
              </div>
              <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap max-w-full">
                <dt className="sr-only">Company</dt>
                <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6 truncate">
                  <OfficeBuildingIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="truncate">{workspace?.name}</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardHeader.Skeleton = DashboardHeaderSkeleton;
