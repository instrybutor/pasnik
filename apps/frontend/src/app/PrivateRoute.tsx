import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';

import { useAuth } from '@pasnik/shared/utils-auth';

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const { user } = useAuth();
  const history = useHistory();

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: `/login?redirectTo=${history.location.pathname}`,
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
}
