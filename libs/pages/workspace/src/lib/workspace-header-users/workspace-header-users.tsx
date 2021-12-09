import {
  UsersPopoverElementProps,
  useWorkspaceUsers,
  WorkspaceUsers,
} from '@pasnik/features/workspaces';
import { WorkspaceUserPopover } from '../workspace-user-popover/workspace-user-popover';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

export function WorkspaceHeaderUsers() {
  const { slug } = useParams<'slug'>();
  const { data: users } = useWorkspaceUsers(slug!);

  const popoverElement = useCallback(
    ({ workspaceUser }: UsersPopoverElementProps) => (
      <div className="bg-white p-4 w-72">
        <WorkspaceUserPopover user={workspaceUser} />
      </div>
    ),
    []
  );

  return (
    <WorkspaceUsers
      usersToShow={10}
      avatarSize="sm"
      users={users}
      popoverElement={popoverElement}
    />
  );
}
