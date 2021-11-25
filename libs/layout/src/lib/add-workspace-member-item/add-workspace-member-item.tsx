import { XIcon } from '@heroicons/react/outline';
import {
  CreateWorkspaceUserDto,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';
import { useUserStore } from '@pasnik/store';
import { useCallback } from 'react';
import { UserInfo } from '@pasnik/components';

interface AddWorkspaceMemberItemParams {
  createUserDto?: CreateWorkspaceUserDto;
  onRemove: () => void;
  onRoleChange: (role: WorkspaceUserRole) => void;
}

export function AddWorkspaceMemberItem({
  createUserDto,
  onRemove,
  onRoleChange,
}: AddWorkspaceMemberItemParams) {
  const user = useUserStore(
    useCallback(
      (store) => {
        return store.users.find((user) => user.id === createUserDto?.userId);
      },
      [createUserDto?.userId]
    )
  );

  return (
    <li className="py-3 flex justify-between items-center">
      <div className="flex items-center">
        <UserInfo user={user} />
        {createUserDto?.role}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={() => {
          if (createUserDto?.role === WorkspaceUserRole.User) {
            onRoleChange(WorkspaceUserRole.Admin);
          } else {
            onRoleChange(WorkspaceUserRole.User);
          }
        }}
      >
        toggle
      </button>
    </li>
  );
}
