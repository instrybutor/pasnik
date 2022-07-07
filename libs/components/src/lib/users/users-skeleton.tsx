import { UserModel } from '@pasnik/api/data-transfer';
import { useState } from 'react';
import { UserAvatar, UserAvatarSize } from '../user-avatar/';

export interface UsersSkeletonProps {
  usersToShow?: number;
  avatarSize?: UserAvatarSize;
}

export function UsersSkeleton({ avatarSize, usersToShow }: UsersSkeletonProps) {
  const [visibleUsers] = useState<UserModel[]>(Array(usersToShow).fill(null));

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-shrink-0 -space-x-1 animate-pulse">
        {visibleUsers.map((user, index) => (
          <UserAvatar.Skeleton
            key={index}
            size={avatarSize}
            className="max-w-none ring-2 ring-white bg-gray-300"
            fallback={null}
          />
        ))}
      </div>
    </div>
  );
}
