import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { useCurrentUser } from './queries/use-current-user';

export interface PublicOnlyProps {
  children: JSX.Element;
}

export function PublicOnly({ children }: PublicOnlyProps) {
  const { isSuccess } = useCurrentUser({ suspense: false });

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  return children ?? <Outlet />;
}
