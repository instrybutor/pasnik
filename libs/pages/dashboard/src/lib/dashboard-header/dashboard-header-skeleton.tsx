import { UserAvatar } from '@pasnik/components';

export function DashboardHeaderSkeleton() {
  return (
    <div className="animate-pulse px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <div className="hidden sm:block">
              <UserAvatar size="xxlg" />
            </div>
            <div className="max-w-full">
              <div className="flex items-center">
                <div className="sm:hidden">
                  <UserAvatar size="xxlg" />
                </div>
                <h1 className="ml-3 text-2xl font-normal leading-7 text-gray-900 sm:leading-9 sm:truncate">
                  <div className="skeleton w-64" />
                </h1>
              </div>
              <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap max-w-full">
                <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6 truncate">
                  <div className="skeleton h-5 w-5 mr-1" />
                  <div className="skeleton w-32"></div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
