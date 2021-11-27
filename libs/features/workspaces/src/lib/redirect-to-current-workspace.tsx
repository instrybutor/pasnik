import { Navigate } from 'react-router-dom';
import { useUserStore } from '@pasnik/store';

export function RedirectToCurrentWorkspace() {
  const { user } = useUserStore();
  return <Navigate to={`/w/${user?.currentWorkspaceId}`} />;
}
