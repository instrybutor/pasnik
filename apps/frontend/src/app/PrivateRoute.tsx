import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '@pasnik/shared/utils-auth';

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const auth = useAuth();

  if (!auth.user) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
}
