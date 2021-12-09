import { UserModel } from '@pasnik/api/data-transfer';
import { UserAvatar, UserAvatarSize } from '../user-avatar/user-avatar';
import { useEffect, useState } from 'react';

export interface UsersSkeletonProps {
  usersToShow?: number;
  avatarSize?: UserAvatarSize;
}

export function UsersSkeleton({ avatarSize, usersToShow }: UsersSkeletonProps) {
  const [visibleUsers, setVisibleUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    setVisibleUsers(Array(usersToShow).fill(null));
  }, [usersToShow, setVisibleUsers]);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-shrink-0 -space-x-1 animate-pulse">
        {visibleUsers.map((user, index) => (
          <UserAvatar
            key={index}
            size={avatarSize}
            className="max-w-none ring-2 ring-white bg-gray-300"
            fallback={<></>}
          />
        ))}
      </div>
    </div>
  );
}
