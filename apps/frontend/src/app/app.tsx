import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';
import { SignIn } from '@pasnik/auth/sign-in';

import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { CreateOrder } from './CreateOrder/CreateOrder';
import { OrderDetails } from './OrderDetails';
import { Container } from './Container';

export function App() {
  return (
    <BrowserRouter>
      <ProvideAuth>
        <Container>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={SignIn} />

            <PrivateRoute path="/create-order" component={CreateOrder} />
            <PrivateRoute path="/order/:id" component={OrderDetails} />

            <Redirect to="/login" />
          </Switch>
        </Container>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
