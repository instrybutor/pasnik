import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';

import { useAuth } from './auth';

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const { user } = useAuth();
  const history = useHistory();

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          search: `redirectTo=${history.location.pathname}`,
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
}
