import { Navigate } from 'react-router-dom';
import { useWorkspaceFacade } from './workspace.facade';

export function RedirectToCurrentWorkspace() {
  const { currentWorkspace } = useWorkspaceFacade();

  return currentWorkspace ? (
    <Navigate to={`/workspace/${currentWorkspace?.slug}`} />
  ) : (
    <></>
  );
}
