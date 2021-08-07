import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import Dashboard from './Dashboard';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
