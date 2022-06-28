import { useUserStore } from '@pasnik/store';
import { useCurrentWorkspaceById } from './use-workspace-by-id';

export const useCurrentWorkspace = () => {
  const { user } = useUserStore();
  if (!user) {
    throw new Error('No user found');
  }
  return useCurrentWorkspaceById(user?.currentWorkspaceId);
};
