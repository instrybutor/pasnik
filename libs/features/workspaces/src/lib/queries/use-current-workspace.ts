import { useCurrentWorkspaceById } from './use-workspace-by-id';
import { useCurrentUser } from '@pasnik/auth';

export const useCurrentWorkspace = () => {
  const user = useCurrentUser();
  return useCurrentWorkspaceById(user.currentWorkspaceId);
};
