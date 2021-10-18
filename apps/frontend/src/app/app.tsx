import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';
import { SignIn } from '@pasnik/auth/sign-in';

import { PagesDashboard } from '@pasnik/pages/dashboard';
import { PagesOrder } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { CreateOrder } from '@pasnik/orders/create-order';
import { EditOrder } from '@pasnik/orders/edit-order';

import { PrivateRoute } from './PrivateRoute';

export function App() {
  const version = process.env.NX_COMMIT_HASH;

  return (
    <BrowserRouter>
      <ProvideAuth>
        <Switch>
          <Route path="/login" component={SignIn} />

          <Layout version={version}>
            <PrivateRoute exact path="/" component={PagesDashboard} />
            <PrivateRoute path="/create-order" component={CreateOrder} />
            <PrivateRoute path="/history" component={PagesOrders} />
            <PrivateRoute exact path="/order/:orderId" component={PagesOrder} />
            <PrivateRoute
              exact
              path="/order/:orderId/edit"
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
