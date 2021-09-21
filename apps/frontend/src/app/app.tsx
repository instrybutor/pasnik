import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';
import { ActiveOrder } from '@pasnik/orders/active-order';

import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { CreateOrder } from './CreateOrder/CreateOrder';

export function App() {
  const commitHash = process.env.NX_COMMIT_HASH;
  return (
    <ProvideAuth>
      <div className="flex flex-col h-screen justify-between">
        <div className="mb-auto">
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/login" component={SignIn} />

              <PrivateRoute path="/create-order" component={CreateOrder} />
              <PrivateRoute path="/order/:id" component={ActiveOrder} />

              <Redirect to="/login" />
            </Switch>
          </BrowserRouter>
        </div>
        <div className="p-4">Version: { commitHash ?? 'Development' }</div>
      </div>
    </ProvideAuth>
  );
}

export default App;
