import { Spinner } from '@pasnik/components';
import { WorkspaceUsers } from '@pasnik/features/workspaces';

export function WorkspaceSuspenseContainer() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl md:mx-auto lg:px-8">
          <div className="py-6 sm:flex sm:items-center justify-between border-t border-gray-200 animate-pulse">
            <div className="flex-1 min-w-0">
              <div className="skeleton text-2xl w-2/6" />
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <WorkspaceUsers.Skeleton usersToShow={10} avatarSize="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex-1">
        <div className="mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white sm:rounded-md shadow">
            <div className="border-t border-gray-200 divide-y divide-gray-200 sm:border-t-0 sm:rounded-md py-16">
              <Spinner />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
