import {
  WorkspaceUserModel,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';
import { ConfirmButton, UserInfo } from '@pasnik/components';
import { Can, WorkspaceUsersAction } from '@pasnik/ability';
import { TrashIcon } from '@heroicons/react/solid';
import {
  useWorkspaceRemoveMembersMutation,
  useWorkspaceUserUpdateMutation,
} from '@pasnik/features/workspaces';
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/outline';
import { useMemo } from 'react';

export interface WorkspaceUserPopoverProps {
  user: WorkspaceUserModel;
  slug: string;
}

export function WorkspaceUserPopover({
  user,
  slug,
}: WorkspaceUserPopoverProps) {
  const deleteUser = useWorkspaceRemoveMembersMutation(slug);
  const updateUser = useWorkspaceUserUpdateMutation(slug, user.id);
  const role = useMemo(() => {
    switch (user.role) {
      case WorkspaceUserRole.Admin:
        return 'Admistrator';
      case WorkspaceUserRole.Owner:
        return 'Właściciel';
      case WorkspaceUserRole.User:
        return 'Użytkownik';
    }
    return user.role;
  }, [user.role]);
  return (
    <div className="flex flex-row justify-between items-center">
      <UserInfo user={user.user}>Rola: {role}</UserInfo>
      <div className="inline-flex gap-2">
        <Can I={WorkspaceUsersAction.Promote} this={user}>
          <button
            onClick={() => {
              updateUser.mutateAsync({ role: WorkspaceUserRole.Admin });
            }}
            type="button"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ChevronDoubleUpIcon
              className="h-5 w-5 pointer-events-none"
              aria-hidden="true"
            />
          </button>
        </Can>
        <Can I={WorkspaceUsersAction.Demote} this={user}>
          <button
            onClick={() => {
              updateUser.mutateAsync({ role: WorkspaceUserRole.User });
            }}
            type="button"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ChevronDoubleDownIcon
              className="h-5 w-5 pointer-events-none"
              aria-hidden="true"
            />
          </button>
        </Can>
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
    </div>
  );
}
