import { useWorkspaceUsers } from './use-workspace-users';
import { toEntities } from '@pasnik/shared/utils';

export const useWorkspaceUsersEntities = (slug?: string, suspense = true) => {
  const { data } = useWorkspaceUsers(slug, suspense);

  return toEntities(data ?? []);
};
