import {
  UsersPopoverElementProps,
  useWorkspaceUsers,
  WorkspaceUsers,
} from '@pasnik/features/workspaces';
import { WorkspaceUserPopover } from '../workspace-user-popover/workspace-user-popover';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { WorkspaceUserInviteButton } from '../workspace-user-invite-button/workspace-user-invite-button';
import { Can, WorkspaceUsersAction } from '@pasnik/ability';

export function WorkspaceHeaderUsers() {
  const { slug } = useParams<'slug'>();
  const { data: users } = useWorkspaceUsers(slug!);

  const userPopoverElement = useCallback(
    ({ workspaceUser }: UsersPopoverElementProps) => (
      <div className="bg-white p-4 w-72">
        <WorkspaceUserPopover user={workspaceUser} />
      </div>
    ),
    []
  );

  return (
    <>
      <WorkspaceUsers
        usersToShow={10}
        avatarSize="sm"
        users={users}
        popoverElement={userPopoverElement}
      />
      <Can I={WorkspaceUsersAction.Create} on="WorkspaceUserModel">
        <WorkspaceUserInviteButton />
      </Can>
    </>
  );
}
