import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';
import { SignIn } from '@pasnik/auth/sign-in';

import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { CreateOrder } from './CreateOrder/CreateOrder';
import { OrderDetails } from './OrderDetails';
import { Layout } from '@pasnik/layout';

export function App() {
  const version = process.env.NX_COMMIT_HASH;

  return (
    <BrowserRouter>
      <ProvideAuth>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Layout version={version}>
            <PrivateRoute exact path="/" component={Dashboard} />

            <PrivateRoute path="/create-order" component={CreateOrder} />
            <PrivateRoute path="/order/:id" component={OrderDetails} />
          </Layout>
          <Redirect to="/login" />
        </Switch>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
