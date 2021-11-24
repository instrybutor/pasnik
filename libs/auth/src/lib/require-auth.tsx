import { Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router';
import { useUserStore } from '@pasnik/store';

export interface RequireAuthProps {
  admin?: boolean;
  children?: JSX.Element;
}

export function RequireAuth({ admin, children }: RequireAuthProps) {
  const { user } = useUserStore();
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
