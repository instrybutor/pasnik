import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProvideAuth, PublicOnly, RequireAuth } from '@pasnik/auth';

import { PagesLogin } from '@pasnik/pages/login';
import { PagesDashboard } from '@pasnik/pages/dashboard';
import { PagesOrder } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { CreateOrder } from '@pasnik/orders/create-order';
import { PagesAdminInvitations } from '@pasnik/pages/admin-invitations';

import { EditOrder } from '@pasnik/orders/edit-order';
import { PagesWorkspace } from '@pasnik/pages/workspace';
import { RedirectToCurrentWorkspace } from '@pasnik/features/workspaces';
import { initBrowserNotifications } from '@pasnik/shared/notification';

initBrowserNotifications();

export function App() {
  const version = process.env.NX_VERSION;

  return (
    <BrowserRouter>
      <ProvideAuth>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicOnly>
                <PagesLogin />
              </PublicOnly>
            }
          />

          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout version={version} />
              </RequireAuth>
            }
          >
            <Route index element={<PagesDashboard />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/history" element={<PagesOrders />} />
            <Route path="/workspace" element={<RedirectToCurrentWorkspace />} />
            <Route path="/workspace/:slug/*" element={<PagesWorkspace />} />
            <Route path="/order">
              <Route path=":slug" element={<PagesOrder />} />
              <Route path=":slug/edit" element={<EditOrder />} />
            </Route>
            <Route path="/admin" element={<RequireAuth admin={true} />}>
              <Route path="invitations" element={<PagesAdminInvitations />} />
            </Route>
          </Route>
        </Routes>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
