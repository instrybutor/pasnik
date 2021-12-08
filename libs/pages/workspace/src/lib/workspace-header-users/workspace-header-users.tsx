import { useWorkspaceUsers, WorkspaceUsers } from '@pasnik/features/workspaces';
import { WorkspaceUserPopover } from '../workspace-user-popover/workspace-user-popover';
import { useParams } from 'react-router-dom';

export function WorkspaceHeaderUsers() {
  const { slug } = useParams<'slug'>();
  const { data: users } = useWorkspaceUsers(slug!);

  return (
    <WorkspaceUsers
      usersToShow={10}
      avatarSize="sm"
      users={users}
      popoverElement={({ workspaceUser }) => (
        <div className="bg-white p-4 w-72">
          <WorkspaceUserPopover user={workspaceUser} />
        </div>
      )}
    />
  );
}
