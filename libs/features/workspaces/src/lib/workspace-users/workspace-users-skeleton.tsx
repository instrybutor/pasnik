import { UserModel } from '@pasnik/api/data-transfer';
import { useEffect, useState } from 'react';
import { UserAvatar, UserAvatarSize } from '@pasnik/components';

export interface UsersSkeletonProps {
  usersToShow?: number;
  avatarSize?: UserAvatarSize;
}

export function WorkspaceUsersSkeleton({
  avatarSize,
  usersToShow,
}: UsersSkeletonProps) {
  const [visibleUsers, setVisibleUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    setVisibleUsers(Array(usersToShow).fill(null));
  }, [usersToShow, setVisibleUsers, visibleUsers]);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-shrink-0 -space-x-1 animate-pulse">
        {visibleUsers.map((user, index) => (
          <UserAvatar
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
