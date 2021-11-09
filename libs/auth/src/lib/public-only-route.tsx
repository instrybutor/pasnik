import { useCallback } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuth } from './auth';

export function PublicOnlyRoute({
  children,
  ...rest
}: Pick<RouteProps, 'path' | 'exact' | 'children'>) {
  const { user } = useAuth();

  const renderer = useCallback(() => {
    if (user) {
      return (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      );
    }

    return children;
  }, [user, children]);

  return <Route path={rest.path} exact={rest.exact} render={renderer} />;
}
