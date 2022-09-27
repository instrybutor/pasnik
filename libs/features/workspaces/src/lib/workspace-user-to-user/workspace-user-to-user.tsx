import { ReactElement, useMemo } from 'react';
import { UserModel } from '@pasnik/api/data-transfer';
import { useWorkspaceById, useWorkspaceUsersEntities } from '../queries';

export interface WorkspaceUserToUserProps {
  workspaceUserId: number;
  workspaceId: number;
  children: (user: UserModel) => ReactElement;
}

export function WorkspaceUserToUser({
  workspaceUserId,
  workspaceId,
  children,
}: WorkspaceUserToUserProps) {
  const workspace = useWorkspaceById(workspaceId);
  const users = useWorkspaceUsersEntities(workspace?.slug);
  const workspaceUser = useMemo(() => {
    return users[workspaceUserId];
  }, [workspaceUserId, users]);
  return workspaceUser && children(workspaceUser.user);
}
