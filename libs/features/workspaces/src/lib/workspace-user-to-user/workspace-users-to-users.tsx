import { ReactElement, useCallback, useMemo } from 'react';
import { UserModel, WorkspaceUserModel } from '@pasnik/api/data-transfer';
import { useWorkspaceById, useWorkspaceUsersEntities } from '../queries';

export interface WorkspaceUserToUserProps {
  workspaceUsers?: WorkspaceUserModel[];
  workspaceId?: number;
  onChange: (workspaceUserId: number) => void;
  children: (
    users: UserModel[],
    onChange: (userId: number) => WorkspaceUserModel | undefined
  ) => ReactElement;
}

export function WorkspaceUsersToUsers({
  workspaceUsers,
  workspaceId,
  children,
}: WorkspaceUserToUserProps) {
  const onChange = useCallback(
    (_userId: number) => {
      return workspaceUsers?.find(({ userId }) => _userId === userId);
    },
    [workspaceUsers]
  );
  const workspace = useWorkspaceById(workspaceId);
  const users = useWorkspaceUsersEntities(workspace?.slug);
  const filteredUsers = useMemo(() => {
    return workspaceUsers
      ?.map(({ userId }) => users[userId]?.user)
      .filter(Boolean);
  }, [users, workspaceUsers]);
  return (filteredUsers && children(filteredUsers, onChange)) || null;
}
