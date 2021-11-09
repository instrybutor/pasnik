import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { PrivateRoute, ProvideAuth, PublicOnlyRoute } from '@pasnik/auth';

import { PagesLogin } from '@pasnik/pages/login';
import { PagesDashboard } from '@pasnik/pages/dashboard';
import { PagesOrder } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { CreateOrder } from '@pasnik/orders/create-order';
import { PagesAdminInvitations } from '@pasnik/pages/admin-invitations';

import { EditOrder } from '@pasnik/orders/edit-order';

export function App() {
  const version = process.env.NX_VERSION;

  return (
    <BrowserRouter>
      <ProvideAuth>
        <Switch>
          <PublicOnlyRoute path="/login">
            <PagesLogin />
          </PublicOnlyRoute>

          <Layout version={version}>
            <PrivateRoute exact path="/">
              <PagesDashboard />
            </PrivateRoute>
            <PrivateRoute path="/create-order">
              <CreateOrder />
            </PrivateRoute>
            <PrivateRoute path="/history">
              <PagesOrders />
            </PrivateRoute>
            <PrivateRoute exact path="/order/:slug">
              <PagesOrder />
            </PrivateRoute>
            <PrivateRoute exact path="/order/:slug/edit">
              <EditOrder />
            </PrivateRoute>
            <PrivateRoute admin={true} path="/admin/invitations">
              <PagesAdminInvitations />
            </PrivateRoute>
          </Layout>

          <Redirect to="/login" />
        </Switch>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
