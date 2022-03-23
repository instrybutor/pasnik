import { WorkspaceUserModel } from '@pasnik/api/data-transfer';
import { ReactElement, useEffect, useState } from 'react';
import { UserAvatar, UserAvatarSize } from '@pasnik/components';

export interface WorkspaceUsersPopoverElementProps {
  user: WorkspaceUserModel;
}

export interface WorkspaceUsersContainerProps {
  users?: WorkspaceUserModel[];
  avatarSize?: UserAvatarSize;
  popoverElement?: (props: WorkspaceUsersPopoverElementProps) => ReactElement;
}

export function WorkspaceUsersContainer({
  users,
  avatarSize,
  popoverElement,
}: WorkspaceUsersContainerProps) {
  const [filteredUsers, setFilteredUsers] = useState<WorkspaceUserModel[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<WorkspaceUserModel | null>(
    null
  );

  useEffect(() => {
    if (users) {
      setFilteredUsers(
        users.filter(({ user }) =>
          [user?.givenName, user?.familyName]
            .join(' ')
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        )
      );
    }
  }, [filterValue, users, setFilteredUsers]);

  return (
    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 flex flex-wrap gap-2 max-w-xs">
      {selectedUser && popoverElement
        ? popoverElement({ user: selectedUser })
        : filteredUsers.map((workspaceUser) => (
            <div className="p-4" key={workspaceUser.id}>
              <input
                placeholder="Szukaj..."
                type="text"
                id="workspace-name"
                className="block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md mb-2"
                onChange={({ target: { value } }) => {
                  setFilterValue(value ?? '');
                }}
              />
              <button
                key={workspaceUser.id}
                onClick={() => {
                  setSelectedUser(workspaceUser);
                }}
              >
                <UserAvatar
                  user={workspaceUser.user}
                  size={avatarSize}
                  className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                />
              </button>
            </div>
          ))}
    </div>
  );
}
