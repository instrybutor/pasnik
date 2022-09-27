import { useWorkspaceUser } from './queries';
import { useCurrentWorkspace } from './use-current-workspace';
import { useCurrentUser } from '@pasnik/auth';

export function useCurrentWorkspaceUser() {
  const { data: workspace } = useCurrentWorkspace();
  const { data: user } = useCurrentUser();
  return useWorkspaceUser(workspace?.slug, user);
}
