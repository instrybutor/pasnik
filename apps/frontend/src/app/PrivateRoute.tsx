import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from '@pasnik/shared/utils-auth';

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
