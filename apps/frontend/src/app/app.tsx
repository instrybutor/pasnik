import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute, ProvideAuth } from '@pasnik/auth';

import { PagesLogin } from '@pasnik/pages/login';
import { PagesDashboard } from '@pasnik/pages/dashboard';
import { PagesOrder } from '@pasnik/pages/order';
import { Layout } from '@pasnik/layout';
import { PagesOrders } from '@pasnik/pages/orders';
import { CreateOrder } from '@pasnik/orders/create-order';
import { EditOrder } from '@pasnik/orders/edit-order';

export function App() {
  const version = process.env.NX_VERSION;

  return (
    <BrowserRouter>
      <ProvideAuth>
        <Switch>
          <Route path="/login" component={PagesLogin} />

          <PrivateRoute>
            <Layout version={version}>
              <Switch>
                <Route exact path="/" component={PagesDashboard} />
                <Route path="/create-order" component={CreateOrder} />
                <Route path="/history" component={PagesOrders} />
                <Route path="/order/:slug" component={PagesOrder} />
                <Route path="/order/:slug/edit" component={EditOrder} />
              </Switch>
            </Layout>
          </PrivateRoute>

          <Redirect to="/login" />
        </Switch>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
