import { Outlet, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { SyntheticEvent, useCallback } from 'react';
import { WorkspaceHeader } from '../workspace-header/workspace-header';
import { QueryBoundary, Spinner, TabLink } from '@pasnik/components';
import { WorkspaceOrders } from '../workspace-orders/workspace-orders';
import { OrdersEmpty } from '@pasnik/features/orders';
import { WorkspaceInactiveOrdersEmpty } from '../workspace-inactive-orders-empty/workspace-inactive-orders-empty';
import {
  useWorkspace,
  WorkspaceAbilityProvider,
} from '@pasnik/features/workspaces';
import { useTranslation } from 'react-i18next';
import { useSlug } from '@pasnik/shared/utils';

export function WorkspaceContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const slug = useSlug();

  const { data: workspace } = useWorkspace(slug);

  const onTabChange = useCallback(
    (event: SyntheticEvent<HTMLSelectElement>) => {
      navigate(event.currentTarget.value);
    },
    [navigate]
  );

  const currentPath = useMatch({ path: '/workspace/:slug', end: true })
    ? '.'
    : './inactive';

  return (
    <WorkspaceAbilityProvider slug={slug}>
      <header className="bg-white shadow">
        <WorkspaceHeader />
      </header>

      <main className="flex-grow flex-1">
        <div className="mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white sm:rounded-md shadow">
            <div className="sm:hidden">
              <select
                value={currentPath}
                onChange={onTabChange}
                id="tabs"
                name="tabs"
                className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
              >
                <option value=".">{t('workspace.active')}</option>
                <option value="./inactive">{t('workspace.inactive')}</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav
                  className="mt-2 -mb-px flex space-x-4 px-4"
                  aria-label="Tabs"
                >
                  <TabLink to="." end={true}>
                    {t('workspace.active')}
                  </TabLink>
                  <TabLink to="./inactive" end={true}>
                    {t('workspace.inactive')}
                  </TabLink>
                </nav>
              </div>
            </div>
            <div className="border-t border-gray-200 divide-y divide-gray-200 sm:border-t-0 sm:rounded-md">
              <QueryBoundary fallback={<Spinner />}>
                <Routes>
                  <Route element={<Outlet />}>
                    <Route
                      index
                      element={
                        <WorkspaceOrders
                          empty={<OrdersEmpty workspace={workspace} />}
                          type="active"
                        />
                      }
                    />
                    <Route
                      path="inactive"
                      element={
                        <WorkspaceOrders
                          empty={<WorkspaceInactiveOrdersEmpty />}
                          type="inactive"
                        />
                      }
                    />
                  </Route>
                </Routes>
              </QueryBoundary>
            </div>
          </div>
        </div>
      </main>
    </WorkspaceAbilityProvider>
  );
}
