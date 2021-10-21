import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';
import { SignIn } from '@pasnik/auth/sign-in';

import { PagesDashboard } from '@pasnik/pages/dashboard';
import { PagesOrder } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { CreateOrder } from '@pasnik/orders/create-order';
import { PagesAdminInvitations } from '@pasnik/pages/admin-invitations';

import { EditOrder } from '@pasnik/orders/edit-order';
import { PrivateRoute } from './PrivateRoute';

export function App() {
  const version = process.env.NX_VERSION;

  return (
    <BrowserRouter>
      <ProvideAuth>
        <Switch>
          <Route path="/login" component={SignIn} />

          <Layout version={version}>
            <PrivateRoute exact path="/" component={PagesDashboard} />
            <PrivateRoute path="/create-order" component={CreateOrder} />
            <PrivateRoute path="/history" component={PagesOrders} />
            <PrivateRoute path="/order/:slug" component={PagesOrder} />
            <PrivateRoute
              exact
              path="/order/:slug/edit"
              component={EditOrder}
            />
            <PrivateRoute
              admin={true}
              path="/admin/invitations"
              component={PagesAdminInvitations}
            />
          </Layout>

          <Redirect to="/login" />
        </Switch>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
