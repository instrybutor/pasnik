import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { ProvideAuth } from './utils/ProvideAuth';

export function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/login" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
