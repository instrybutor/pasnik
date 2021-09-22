import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ProvideAuth } from '@pasnik/shared/utils-auth';

import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { CreateOrder } from './CreateOrder/CreateOrder';
import { OrderDetails } from './OrderDetails';

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
              <PrivateRoute path="/:id" component={OrderDetails} />

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
