import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '@pasnik/shared/utils-auth';

export interface PrivateRouteProps extends RouteProps {
  admin?: boolean;
}

export function PrivateRoute({ children, admin, ...rest }: PrivateRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: '/login',
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
