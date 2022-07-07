import classNames from 'classnames';
import { getSizeClass, UserAvatarProps } from './user-avatar-types';

export function UserAvatarSkeleton({ size, className }: UserAvatarProps) {
  return (
    <div
      className={classNames(
        getSizeClass(size),
        'inline-block skeleton rounded-full overflow-hidden flex-shrink-0',
        className
      )}
      tabIndex={0}
    ></div>
  );
}
