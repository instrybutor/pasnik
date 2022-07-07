import { Navigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from './queries/use-current-user';
import axios from 'axios';

export interface RequireAuthProps {
  admin?: boolean;
  children?: JSX.Element;
}

export function RequireAuth({ admin, children }: RequireAuthProps) {
  const location = useLocation();

  const { user, error } = useCurrentUser({ suspense: false });

  if (error && axios.isAxiosError(error) && error.response?.status === 401) {
    return (
      <Navigate
        to={{
          pathname: '/login',
          search: `redirectTo=${location.pathname}`,
        }}
      />
    );
  }

  if (user && admin && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
