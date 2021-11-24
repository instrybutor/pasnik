import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { useUserStore } from '@pasnik/store';

export interface PublicOnlyProps {
  children: JSX.Element;
}

export function PublicOnly({ children }: PublicOnlyProps) {
  const { user } = useUserStore();

  if (user) {
    return <Navigate to="/" />;
  }

  return children ?? <Outlet />;
}
