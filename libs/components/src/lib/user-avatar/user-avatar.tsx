import { UserModel } from '@pasnik/api/data-transfer';
import classNames from 'classnames';
import { ReactElement } from 'react';

export type UserAvatarSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg';

export interface UserAvatarProps {
  user?: UserModel | null;
  size?: UserAvatarSize;
  className?: string;
  fallback?: ReactElement | null;
}

export function UserAvatar({
  user,
  size,
  className,
  fallback,
}: UserAvatarProps) {
  const formatInitials = ({ givenName, familyName }: UserModel) =>
    `${givenName![0]}${familyName![0]}`;

  const formatName = ({ givenName, familyName }: UserModel) =>
    `${givenName!} ${familyName!}`;

  const sizeClasses = classNames({
    'h-6 w-6': size === 'xsm',
    'h-8 w-8': size === 'sm',
    'h-10 w-10': size === 'md' || !size,
    'h-12 w-12': size === 'lg',
    'h-14 w-14': size === 'xlg',
    'h-16 w-16': size === 'xxlg',
  });

  const defaultFallback = (
    <svg
      className="h-full w-full text-gray-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  return user?.avatarImg ? (
    <img
      className={classNames(
        sizeClasses,
        'inline-block rounded-full',
        className
      )}
      referrerPolicy="no-referrer"
      src={user.avatarImg}
      alt={formatName(user)}
    />
  ) : user && user.familyName && user.givenName ? (
    <span
      className={classNames(
        sizeClasses,
        'inline-flex items-center justify-center rounded-full bg-gray-500',
        className
      )}
    >
      <span className="text-sm font-medium leading-none text-white">
        {formatInitials(user)}
      </span>
    </span>
  ) : (
    <span
      className={classNames(
        sizeClasses,
        'inline-block rounded-full overflow-hidden bg-gray-100',
        className
      )}
    >
      {fallback ?? defaultFallback}
    </span>
  );
}
