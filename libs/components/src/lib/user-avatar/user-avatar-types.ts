import classNames from 'classnames';
import { UserModel } from '@pasnik/api/data-transfer';
import { ReactElement } from 'react';

export type UserAvatarSize =
  | 'xxsm'
  | 'xsm'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xlg'
  | 'xxlg';

export const getSizeClass = (size?: UserAvatarSize) =>
  classNames({
    'h-4 w-4': size === 'xxsm',
    'h-6 w-6': size === 'xsm',
    'h-8 w-8': size === 'sm',
    'h-10 w-10': size === 'md' || !size,
    'h-12 w-12': size === 'lg',
    'h-14 w-14': size === 'xlg',
    'h-16 w-16': size === 'xxlg',
  });

export interface UserAvatarProps {
  user?: Partial<UserModel> | null;
  size?: UserAvatarSize;
  className?: string;
  fallback?: ReactElement | null;
  showInitials?: boolean;
  showTooltip?: boolean | ((user: Partial<UserModel>) => ReactElement);
}
