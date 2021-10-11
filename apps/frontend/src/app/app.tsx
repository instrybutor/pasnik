import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';
import { SignIn } from '@pasnik/auth/sign-in';

import { PrivateRoute } from './PrivateRoute';
import { PagesDashboard } from '@pasnik/pages/dashboard';
import { PagesOrder } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { PagesCreateOrder } from '@pasnik/pages/create-order';

export function App() {
  const version = process.env.NX_COMMIT_HASH;

  return (
    <BrowserRouter>
      <ProvideAuth>
        <Switch>
          <Route path="/login" component={SignIn} />

          <Layout version={version}>
            <PrivateRoute exact path="/" component={PagesDashboard} />
            <PrivateRoute path="/create-order" component={PagesCreateOrder} />
            <PrivateRoute path="/history" component={PagesOrders} />
            <PrivateRoute path="/order/:orderId" component={PagesOrder} />
          </Layout>

          <Redirect to="/login" />
        </Switch>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
