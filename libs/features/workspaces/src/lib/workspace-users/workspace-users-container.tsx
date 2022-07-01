import { WorkspaceUserModel } from '@pasnik/api/data-transfer';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { UserAvatar, UserAvatarSize } from '@pasnik/components';
import { ArrowSmLeftIcon } from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [filteredUsers, setFilteredUsers] = useState<WorkspaceUserModel[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const selectedUser = useMemo(
    () => users?.find(({ id }) => selectedUserId === id),
    [users, selectedUserId]
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
    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5  max-w-xs">
      {selectedUser && popoverElement ? (
        <div>
          <button
            onClick={() => setSelectedUserId(null)}
            type="button"
            className="inline-flex items-center px-2 pt-2 ml-2 mt-2 border border-transparent text-sm leading-4 font-medium text-gray-500 bg-transparent hover:text-gray-700 focus:outline-none "
          >
            <ArrowSmLeftIcon
              className="-ml-0.5 mr-2 h-4 w-4"
              aria-hidden="true"
            />
            {t('actions.back')}
          </button>
          {popoverElement({ user: selectedUser })}
        </div>
      ) : (
        <div className="p-4 flex flex-wrap gap-2">
          <input
            autoFocus={true}
            placeholder="Szukaj..."
            type="text"
            id="workspace-name"
            className="block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md mb-2"
            onChange={({ target: { value } }) => {
              setFilterValue(value ?? '');
            }}
          />
          {filteredUsers.map((workspaceUser) => (
            <button
              key={workspaceUser.id}
              onClick={() => {
                setSelectedUserId(workspaceUser.id);
              }}
            >
              <UserAvatar
                user={workspaceUser.user}
                size={avatarSize}
                className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
