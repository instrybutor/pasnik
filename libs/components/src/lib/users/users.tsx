import { UserModel } from '@pasnik/api/data-transfer';
import { UserAvatar, UserAvatarSize } from '../user-avatar/user-avatar';
import { useEffect, useState } from 'react';

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
          <UserAvatar
            key={user.id}
            user={user}
            size={avatarSize}
            className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
          />
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
