import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';

import { useAuth } from './auth';

export interface PrivateRouteProps extends RouteProps {
  admin?: boolean;
}

export function PrivateRoute({ children, admin, ...rest }: PrivateRouteProps) {
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

  if (admin && !user.isAdmin) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
}
