import { UserModel } from '@pasnik/api/data-transfer';
import { PropsWithChildren } from 'react';
import { UserAvatar, UserAvatarSize } from '../user-avatar/user-avatar';
import { UserName } from '../user-name/user-name';

export interface UserInfoProps {
  user?: UserModel | null;
  size?: UserAvatarSize;
}

export function UserInfo({
  user,
  size,
  children,
}: PropsWithChildren<UserInfoProps>) {
  return (
    <div className="flex items-center">
      <UserAvatar user={user} size={size} />
      <div className="ml-3 overflow-hidden">
        <UserName user={user}>{children}</UserName>
      </div>
    </div>
  );
}
