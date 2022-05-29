import { useWorkspaceUsers } from './use-workspace-users';
import { useMemo } from 'react';
import { UserModel } from '@pasnik/api/data-transfer';

export function useUsersInWorkspace(slug?: string): UserModel[] {
  const { data: workspaceUsers } = useWorkspaceUsers(slug);
  return useMemo(
    () =>
      workspaceUsers?.filter(({ user }) => user).map(({ user }) => user!) ?? [],
    [workspaceUsers]
  );
}
