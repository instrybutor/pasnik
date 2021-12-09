import { useUserStore } from '@pasnik/store';
import { useCurrentWorkspaceById } from './use-workspace-by-id';

export const useCurrentWorkspace = () => {
  const { user } = useUserStore();
  return useCurrentWorkspaceById(user?.currentWorkspaceId);
};
