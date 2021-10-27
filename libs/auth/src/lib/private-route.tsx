import { useCallback } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from './auth';

export interface PrivateRouteProps
  extends Pick<RouteProps, 'path' | 'exact' | 'children'> {
  admin?: boolean;
}

export function PrivateRoute({ children, admin, ...rest }: PrivateRouteProps) {
  const { user } = useAuth();

  const renderer = useCallback(
    ({ location }) => {
      if (!user) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              search: `redirectTo=${location.pathname}`,
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

      return children;
    },
    [user, admin, children]
  );

  return <Route path={rest.path} exact={rest.exact} render={renderer} />;
}
