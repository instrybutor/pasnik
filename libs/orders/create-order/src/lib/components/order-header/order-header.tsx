import { HeaderBreadcrumbs } from '@pasnik/components';
import { useWorkspaceFacade } from '@pasnik/features/workspaces';

export const OrderHeader = () => {
  const { currentWorkspace } = useWorkspaceFacade();
  return (
    <header className="bg-white shadow">
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl md:mx-auto lg:px-8">
          <div className="py-6 xl:flex xl:items-center lg:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0 ml-3">
              <HeaderBreadcrumbs>
                <HeaderBreadcrumbs.Item
                  to={`/workspace/${currentWorkspace?.slug}`}
                >
                  {currentWorkspace?.name}
                </HeaderBreadcrumbs.Item>
              </HeaderBreadcrumbs>
              <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate flex items-center">
                Tworzenie zamówienia
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
