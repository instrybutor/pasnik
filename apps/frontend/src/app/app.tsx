import SignIn from './SignIn';
import { BrowserRouter, Route } from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={SignIn} />\
    </BrowserRouter>

  );
}

export default App;
