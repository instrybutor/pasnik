import { UserModel } from '@pasnik/api/data-transfer';
import { UserAvatar, UserAvatarSize } from '../user-avatar/user-avatar';
import { useEffect, useState } from 'react';
import { UserName } from '../user-name/user-name';

export interface UsersProps {
  users?: UserModel[];
  avatarSize?: UserAvatarSize;
  usersToShow?: number;
}

export function Users({ users, avatarSize, usersToShow }: UsersProps) {
  const [visibleUsers, setVisibleUsers] = useState<UserModel[]>([]);
  useEffect(() => {
    if (users) {
      setVisibleUsers(users.slice(0, usersToShow ?? users.length));
    }
  }, [usersToShow, users, setVisibleUsers]);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-shrink-0 -space-x-1">
        {visibleUsers.map((user) => (
          <button className="flex flex-col items-center group hover:relative hover:opacity-85">
            <UserAvatar
              key={user.id}
              user={user}
              size={avatarSize}
              className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
            />
            <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
              <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                <UserName user={user} />
              </span>
              <div className="w-3 h-3 -mt-2 transform rotate-45 bg-black" />
            </div>
          </button>
        ))}
      </div>
      {users && users.length > visibleUsers.length && (
        <span className="flex-shrink-0 text-xs leading-5 font-bold rounded-full bg-gray-200 px-1.5">
          + {users.length - visibleUsers.length}
        </span>
      )}
    </div>
  );
}
