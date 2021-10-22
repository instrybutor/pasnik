import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';

import { PagesDashboard } from '@pasnik/pages/dashboard';
import { PagesOrder } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { CreateOrder } from '@pasnik/orders/create-order';
import { EditOrder } from '@pasnik/orders/edit-order';

import { PrivateRoute } from './PrivateRoute';
import { PagesLogin } from '@pasnik/pages/login';

export function App() {
  const version = process.env.NX_VERSION;

  return (
    <BrowserRouter>
      <ProvideAuth>
        <Switch>
          <Route path="/login" component={PagesLogin} />

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
          </Layout>

          <Redirect to="/login" />
        </Switch>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
