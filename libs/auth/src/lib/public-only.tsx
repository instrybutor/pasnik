import { Navigate } from 'react-router-dom';

import { useAuth } from './auth';
import { Outlet } from 'react-router';

export interface PublicOnlyProps {
  children: JSX.Element;
}

export function PublicOnly({ children }: PublicOnlyProps) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return children ?? <Outlet />;
}
