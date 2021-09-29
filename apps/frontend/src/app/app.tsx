import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';

import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { CreateOrder } from './CreateOrder/CreateOrder';
import { OrderDetails } from './OrderDetails';
import { Container } from './Container';

export function App() {
  return (
    <ProvideAuth>
      <Container>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={SignIn} />

            <PrivateRoute path="/create-order" component={CreateOrder} />
            <PrivateRoute path="/order/:id" component={OrderDetails} />

            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </Container>
    </ProvideAuth>
  );
}

export default App;
