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
                  <div className="h-16 w-16 bg-gray-300 rounded-full" />
                </div>
                <h1 className="ml-3">
                  <div className="h-7 w-64 my-0.5 bg-gray-300 rounded-md" />
                </h1>
              </div>
              <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap max-w-full">
                <dd className="flex items-center sm:mr-6 gap-1">
                  <div className="h-5 w-5 bg-gray-300 rounded-md" />
                  <div className="h-5 w-32 bg-gray-300 rounded-md" />
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
