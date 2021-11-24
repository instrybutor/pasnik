import { Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router';

import { useAuth } from './auth';

export interface RequireAuthProps {
  admin?: boolean;
  children?: JSX.Element;
}

export function RequireAuth({ admin, children }: RequireAuthProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: '/login',
          search: `redirectTo=${location.pathname}`,
        }}
      />
    );
  }

  if (admin && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children ?? <Outlet />;
}
