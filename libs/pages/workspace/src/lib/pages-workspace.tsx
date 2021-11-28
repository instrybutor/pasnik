import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspaceFacade } from '@pasnik/features/workspaces';
import { useEffect } from 'react';
import { useWorkspaceOrdersStore } from './workspace-store/workspace-orders.store';
import { useWorkspaceUsersStore } from './workspace-store/workspace-users.store';
import { WorkspaceHeader } from './workspace-header/workspace-header';
import { TabLink } from '@pasnik/components';

/* eslint-disable-next-line */
export interface PagesWorkspaceProps {}

export function PagesWorkspace(props: PagesWorkspaceProps) {
  const navigation = useNavigate();
  const { currentWorkspace } = useWorkspaceFacade();
  const { slug } = useParams<'slug'>();
  const { fetchActiveOrders } = useWorkspaceOrdersStore();
  const { fetchUsers } = useWorkspaceUsersStore();

  useEffect(() => {
    if (currentWorkspace?.slug !== slug) {
      navigation(`/workspace/${currentWorkspace?.slug}`);
    } else if (currentWorkspace) {
      Promise.all([
        fetchActiveOrders(currentWorkspace),
        fetchUsers(currentWorkspace),
      ]);
    }
  }, [currentWorkspace, navigation, slug, fetchActiveOrders, fetchUsers]);

  return (
    <>
      <header className="bg-white shadow">
        <WorkspaceHeader />
      </header>

      <main className="flex-grow flex-1">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
                  <TabLink to="." count={1} end={true}>
                    Aktywne
                  </TabLink>
                  <TabLink to="./inactive" count={1} end={true}>
                    Nieaktywne
                  </TabLink>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PagesWorkspace;
