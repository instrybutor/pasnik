import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';
import { SignIn } from '@pasnik/auth/sign-in';

import { PrivateRoute } from './PrivateRoute';
import { CreateOrder } from '@pasnik/orders/create-order';
import { PagesDashboard } from '@pasnik/pages/dashboard';
import { OrderShell } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';

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

            <PrivateRoute path="/order/:orderId" component={OrderShell} />
          </Layout>

          <Redirect to="/login" />
        </Switch>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
