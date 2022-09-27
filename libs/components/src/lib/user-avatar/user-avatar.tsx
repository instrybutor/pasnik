import { UserModel } from '@pasnik/api/data-transfer';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Tooltip } from '../tooltip/tooltip';
import { UserName } from '../user-name/user-name';
import { UserAvatarSkeleton } from './user-avatar-skeleton';
import { getSizeClass, UserAvatarProps } from './user-avatar-types';

export function UserAvatar({
  user,
  size,
  className,
  fallback,
  showInitials,
  showTooltip,
  as,
}: UserAvatarProps) {
  const formatInitials = ({ givenName, familyName }: Partial<UserModel>) =>
    `${givenName![0]}${familyName![0]}`;

  const defaultFallback = (
    <svg
      className="h-full w-full text-gray-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const tooltipTitle = useMemo(() => {
    if (showTooltip instanceof Function) {
      return showTooltip(user!);
    }
    return <UserName user={user} />;
  }, [user, showTooltip]);

  const Wrapper = as || 'span';

  return (
    <Wrapper
      className={classNames(
        getSizeClass(size),
        'inline-block rounded-full overflow-hidden flex-shrink-0',
        className
      )}
    >
      {user?.avatarImg && !showInitials ? (
        <Tooltip title={tooltipTitle} disabled={!showTooltip}>
          <img
            className="inline-flex"
            referrerPolicy="no-referrer"
            src={user.avatarImg}
            alt={formatInitials(user)}
          />
        </Tooltip>
      ) : user && user.familyName && user.givenName ? (
        <Tooltip title={tooltipTitle} disabled={!showTooltip}>
          <span className="text-sm font-medium leading-none text-white">
            <UserName initials={true} user={user} />
          </span>
        </Tooltip>
      ) : (
        <span className="inline-block bg-gray-100">
          {fallback ?? defaultFallback}
        </span>
      )}
    </Wrapper>
  );
}

UserAvatar.Skeleton = UserAvatarSkeleton;
