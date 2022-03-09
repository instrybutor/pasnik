import { PlusIcon } from '@heroicons/react/outline';
import { Popover } from '@pasnik/components';
import { WorkspaceUserInvitePopover } from '../workspace-user-invite-popover/workspace-user-invite-popover';
import { useParams } from 'react-router-dom';
import { useWorkspaceRequestAccesses } from '@pasnik/features/workspaces';

export function WorkspaceUserInviteButton() {
  const { slug } = useParams<'slug'>();
  const { data } = useWorkspaceRequestAccesses(slug!);
  return (
    <Popover
      panel={(props) => <WorkspaceUserInvitePopover slug={slug!} {...props} />}
      className="ml-2 flex-shrink-0 bg-white inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
    >
      <>
        {data && data.length > 0 && (
          <span className="absolute -top-1.5 left-6 items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {data.length}
          </span>
        )}

        <span className="sr-only">Add team member</span>
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </>
    </Popover>
  );
}
