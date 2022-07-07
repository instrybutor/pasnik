import { Navigate } from 'react-router-dom';
import { useCurrentWorkspace } from './use-current-workspace';

export function RedirectToCurrentWorkspace() {
  const { data: currentWorkspace } = useCurrentWorkspace(false);

  return currentWorkspace ? (
    <Navigate to={`/workspace/${currentWorkspace?.slug}`} />
  ) : (
    <Navigate to="/" />
  );
}
