import { Navigate } from 'react-router-dom';
import { useCurrentWorkspace } from './queries';

export function RedirectToCurrentWorkspace() {
  const currentWorkspace = useCurrentWorkspace();

  return currentWorkspace ? (
    <Navigate to={`/workspace/${currentWorkspace?.slug}`} />
  ) : (
    <Navigate to="/" />
  );
}
