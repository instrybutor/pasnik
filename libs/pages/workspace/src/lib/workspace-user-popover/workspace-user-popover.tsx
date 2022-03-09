import { WorkspaceUserModel } from '@pasnik/api/data-transfer';
import { ConfirmButton, UserInfo } from '@pasnik/components';
import { Can, WorkspaceUsersAction } from '@pasnik/ability';
import { TrashIcon } from '@heroicons/react/solid';
import { useWorkspaceRemoveMembersMutation } from '@pasnik/features/workspaces';

export interface WorkspaceUserPopoverProps {
  user: WorkspaceUserModel;
  slug: string;
}
export function WorkspaceUserPopover({
  user,
  slug,
}: WorkspaceUserPopoverProps) {
  const deleteUser = useWorkspaceRemoveMembersMutation(slug);
  return (
    <div className="flex flex-row justify-between items-center">
      <UserInfo user={user.user} />
      <Can I={WorkspaceUsersAction.Delete} this={user}>
        <ConfirmButton
          onClick={() => {
            deleteUser.mutateAsync(user);
          }}
          type="button"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <TrashIcon
            className="h-5 w-5 pointer-events-none"
            aria-hidden="true"
          />
        </ConfirmButton>
      </Can>
    </div>
  );
}
