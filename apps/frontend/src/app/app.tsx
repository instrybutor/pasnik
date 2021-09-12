import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';
import { ActiveOrder } from '@pasnik/orders/active-order';

import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { CreateOrder } from './CreateOrder/CreateOrder';

export function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/login" component={SignIn} />

          <PrivateRoute path="/create-order" component={CreateOrder} />
          <PrivateRoute path="/order/:id" component={ActiveOrder} />

          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
