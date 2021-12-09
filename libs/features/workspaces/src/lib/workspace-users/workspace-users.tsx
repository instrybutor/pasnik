import { WorkspaceUserModel } from '@pasnik/api/data-transfer';
import {
  ChangeEvent,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Popover, Transition } from '@headlessui/react';
import { WorkspaceUsersSkeleton } from './workspace-users-skeleton';
import { UserAvatar, UserAvatarSize, UserName } from '@pasnik/components';

export interface UsersPopoverElementProps {
  workspaceUser: WorkspaceUserModel;
}

export interface UsersProps {
  users?: WorkspaceUserModel[];
  avatarSize?: UserAvatarSize;
  usersToShow?: number;
  popoverElement?: (props: UsersPopoverElementProps) => ReactElement;
}

export function WorkspaceUsers({
  users,
  avatarSize,
  usersToShow,
  popoverElement,
}: UsersProps) {
  const [visibleUsers, setVisibleUsers] = useState<WorkspaceUserModel[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<WorkspaceUserModel[]>([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (users) {
      setVisibleUsers(users.slice(0, usersToShow ?? users.length));
    }
  }, [usersToShow, users, setVisibleUsers]);

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

  const onFilterChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilterValue(event.target.value ?? '');
    },
    [setFilterValue]
  );

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-shrink-0 -space-x-1">
        {visibleUsers.map((workspaceUser) =>
          popoverElement ? (
            <Popover
              key={workspaceUser.id}
              className="relative flex flex-col items-center group"
            >
              <Popover.Button>
                <UserAvatar
                  user={workspaceUser.user}
                  size={avatarSize}
                  className="max-w-none ring-2 ring-white"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-30 px-4 mt-3 top-full transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    {popoverElement({ workspaceUser })}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          ) : (
            <div
              key={workspaceUser.id}
              className="hover:relative flex flex-col items-center group"
            >
              <UserAvatar
                user={workspaceUser.user}
                size={avatarSize}
                className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
              />
              <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                  <UserName user={workspaceUser.user} />
                </span>
                <div className="w-3 h-3 -mt-2 transform rotate-45 bg-black" />
              </div>
            </div>
          )
        )}
        {users && users.length > visibleUsers.length && (
          <Popover className="relative flex flex-col items-center group">
            <Popover.Button className="relative ring-2 ring-white flex-shrink-0 text-xs leading-5 font-bold rounded-full bg-gray-200 h-8 w-8 max-w-none ring-2 ring-white">
              + {users.length - visibleUsers.length}
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-30 w-56 bg-white px-4 mt-3 top-full transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 flex flex-wrap p-4 gap-2">
                  <input
                    placeholder="Szukaj..."
                    type="text"
                    id="workspace-name"
                    className="block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md mb-2"
                    onChange={onFilterChange}
                  />
                  {filteredUsers.map((workspaceUser) => (
                    <button key={workspaceUser.id}>
                      <UserAvatar
                        user={workspaceUser.user}
                        size={avatarSize}
                        className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
                      />
                    </button>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        )}
      </div>
    </div>
  );
}

WorkspaceUsers.Skeleton = WorkspaceUsersSkeleton;
