import { WorkspaceUserModel } from '@pasnik/api/data-transfer';
import { useEffect, useState } from 'react';
import { WorkspaceUsersSkeleton } from './workspace-users-skeleton';
import {
  Popover,
  UserAvatar,
  UserAvatarSize,
  UserName,
} from '@pasnik/components';
import {
  WorkspaceUsersContainer,
  WorkspaceUsersContainerProps,
} from './workspace-users-container';

export interface WorkspaceUsersProps {
  users?: WorkspaceUserModel[];
  avatarSize?: UserAvatarSize;
  usersToShow?: number;
  popoverElement?: WorkspaceUsersContainerProps['popoverElement'];
}

export function WorkspaceUsers({
  users,
  avatarSize,
  usersToShow,
  popoverElement,
}: WorkspaceUsersProps) {
  const [visibleUsers, setVisibleUsers] = useState<WorkspaceUserModel[]>([]);

  useEffect(() => {
    if (users) {
      setVisibleUsers(users.slice(0, usersToShow ?? users.length));
    }
  }, [usersToShow, users, setVisibleUsers]);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-shrink-0 -space-x-1">
        {visibleUsers.map((workspaceUser) =>
          popoverElement ? (
            <Popover
              panel={() => (
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  {popoverElement({ user: workspaceUser })}
                </div>
              )}
              key={workspaceUser.id}
              className="relative flex flex-col items-center group"
            >
              <UserAvatar
                user={workspaceUser.user}
                size={avatarSize}
                className="max-w-none ring-2 ring-white"
              />
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
          <Popover
            panel={() => (
              <WorkspaceUsersContainer
                users={users}
                popoverElement={popoverElement}
                avatarSize={avatarSize}
              />
            )}
            className="relative ring-2 ring-white flex-shrink-0 text-xs leading-5 font-bold rounded-full bg-gray-200 h-8 w-8 max-w-none ring-2 ring-white"
          >
            + {users.length - visibleUsers.length}
          </Popover>
        )}
      </div>
    </div>
  );
}

WorkspaceUsers.Skeleton = WorkspaceUsersSkeleton;
