import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProvideAuth, PublicOnly, RequireAuth } from '@pasnik/auth';

import { PagesLogin } from '@pasnik/pages/login';
import { PagesDashboard } from '@pasnik/pages/dashboard';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { PagesAdminInvitations } from '@pasnik/pages/admin-invitations';
import { PagesWorkspace } from '@pasnik/pages/workspace';
import { RedirectToCurrentWorkspace } from '@pasnik/features/workspaces';
import { PagesOrder } from '@pasnik/pages/order';
import { ToastContainer } from '@pasnik/components';

export function App() {
  const version = process.env.NX_VERSION;

  return (
    <>
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
              <Route
                path="/workspace"
                element={<RedirectToCurrentWorkspace />}
              />
              <Route path="/workspace/:slug/*" element={<PagesWorkspace />} />
              <Route path="/admin" element={<RequireAuth admin={true} />}>
                <Route path="invitations" element={<PagesAdminInvitations />} />
              </Route>

              <Route path="/order/*" element={<PagesOrder />} />
            </Route>
          </Routes>
        </ProvideAuth>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
