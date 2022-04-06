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
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export interface WorkspaceUserPopoverProps {
  user: WorkspaceUserModel;
  slug: string;
}

export function WorkspaceUserPopover({
  user,
  slug,
}: WorkspaceUserPopoverProps) {
  const { t } = useTranslation();
  const deleteUser = useWorkspaceRemoveMembersMutation(slug);
  const updateUser = useWorkspaceUserUpdateMutation(slug, user.id);
  const role = useMemo(() => {
    switch (user.role) {
      case WorkspaceUserRole.Admin:
        return t('workspace.roles.admin');
      case WorkspaceUserRole.Owner:
        return t('workspace.roles.owner');
      case WorkspaceUserRole.User:
        return t('workspace.roles.user');
    }
    return user.role;
  }, [user.role, t]);
  return (
    <div className="flex flex-row justify-between items-center">
      <UserInfo user={user.user}>
        <Can I={WorkspaceUsersAction.Update} this={user}>
          <select
            name="role"
            className="block w-36 pl-1 pr-0 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={user.role}
            onChange={({ target }) =>
              updateUser.mutateAsync({
                role: target.value as WorkspaceUserRole,
              })
            }
          >
            <option value={WorkspaceUserRole.Admin}>
              {t(`workspace.roles.admin`)}
            </option>
            <option value={WorkspaceUserRole.User}>
              {t(`workspace.roles.user`)}
            </option>
          </select>
        </Can>
        <Can I={WorkspaceUsersAction.Update} not this={user}>
          {role}
        </Can>
      </UserInfo>
      <div className="inline-flex gap-2">
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
