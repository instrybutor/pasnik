import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@pasnik/auth';

import { PagesLogin } from '@pasnik/pages/login';
import { PagesDashboard } from '@pasnik/pages/dashboard';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { PagesAdminInvitations } from '@pasnik/pages/admin-invitations';
import { PagesWorkspace } from '@pasnik/pages/workspace';
import { PagesOrder } from '@pasnik/pages/order';
import { ToastContainer } from '@pasnik/components';

export function App() {
  const version = process.env.NX_VERSION;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PagesLogin />} />

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
            <Route path="/workspace/*" element={<PagesWorkspace />} />
            <Route path="/admin" element={<RequireAuth admin={true} />}>
              <Route path="invitations" element={<PagesAdminInvitations />} />
            </Route>

            <Route path="/order/*" element={<PagesOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
