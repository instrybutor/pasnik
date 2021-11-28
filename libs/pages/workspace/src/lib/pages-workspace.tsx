import { Outlet, Route, Routes } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceFacade } from '@pasnik/features/workspaces';
import { useEffect } from 'react';
import { useWorkspaceUsersStore } from './workspace-store/workspace-users.store';
import { WorkspacePageActiveOrders } from './workspace-page-active-orders/workspace-page-active-orders';
import { WorkspaceHeader } from './workspace-header/workspace-header';
import { TabLink } from '@pasnik/components';
import { WorkspacePageInactiveOrders } from './workspace-page-inactive-orders/workspace-page-inactive-orders';

/* eslint-disable-next-line */
export interface PagesWorkspaceProps {}

export function PagesWorkspace(props: PagesWorkspaceProps) {
  const navigation = useNavigate();
  const { currentWorkspace } = useWorkspaceFacade();
  const { slug } = useParams<'slug'>();
  const { fetchUsers } = useWorkspaceUsersStore();

  useEffect(() => {
    if (currentWorkspace?.slug && currentWorkspace?.slug !== slug) {
      navigation(`/workspace/${currentWorkspace?.slug}`);
    } else if (currentWorkspace) {
      fetchUsers(currentWorkspace);
    }
  }, [currentWorkspace, navigation, slug, fetchUsers]);

  return (
    <div className="flex flex-col overflow-auto flex-1">
      <header className="bg-white shadow">
        <WorkspaceHeader />
      </header>

      <main className="flex-grow flex-1 overflow-y-auto">
        <div className="mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white sm:rounded-md shadow">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
              >
                <option>Aktywne</option>
                <option>Zakończone</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav
                  className="mt-2 -mb-px flex space-x-4 px-4"
                  aria-label="Tabs"
                >
                  <TabLink to="." end={true}>
                    Aktywne
                  </TabLink>
                  <TabLink to="./inactive" end={true}>
                    Nieaktywne
                  </TabLink>
                </nav>
              </div>
            </div>
            <div className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0 sm:rounded-md">
              <Routes>
                <Route element={<Outlet />}>
                  <Route index element={<WorkspacePageActiveOrders />} />
                  <Route
                    path="inactive"
                    element={<WorkspacePageInactiveOrders />}
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PagesWorkspace;
