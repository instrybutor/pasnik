import { useCallback } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserStore } from '@pasnik/store';

export function PublicOnlyRoute({
  children,
  ...rest
}: Pick<RouteProps, 'path' | 'exact' | 'children'>) {
  const { user } = useUserStore();

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
