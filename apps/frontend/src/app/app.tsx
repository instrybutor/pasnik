import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProvideAuth, PublicOnly, RequireAuth } from '@pasnik/auth';

import { PagesLogin } from '@pasnik/pages/login';
import { PagesDashboard } from '@pasnik/pages/dashboard';
import { PagesOrder } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { PagesAdminInvitations } from '@pasnik/pages/admin-invitations';
import { PagesWorkspace } from '@pasnik/pages/workspace';
import { RedirectToCurrentWorkspace } from '@pasnik/features/workspaces';
import { PagesV2Order } from '@pasnik/pages/v2-order';

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
            <Route path="/history" element={<PagesOrders />} />
            <Route path="/workspace" element={<RedirectToCurrentWorkspace />} />
            <Route path="/workspace/:slug/*" element={<PagesWorkspace />} />
            <Route path="/order/*" element={<PagesOrder />} />
            <Route path="/admin" element={<RequireAuth admin={true} />}>
              <Route path="invitations" element={<PagesAdminInvitations />} />
            </Route>

            <Route path="/v2/order/*" element={<PagesV2Order />} />
          </Route>
        </Routes>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
