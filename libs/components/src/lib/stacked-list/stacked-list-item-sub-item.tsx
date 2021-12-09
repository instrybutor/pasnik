import { ReactElement } from 'react';
import classNames from 'classnames';

export interface StackedListItemSubItemProps {
  children?: ReactElement | ReactElement[] | string;
  className?: string;
}

export function StackedListItemSubItem({
  children,
  className,
}: StackedListItemSubItemProps) {
  return (
    <span
      className={classNames(
        'flex items-center text-sm text-gray-500',
        className
      )}
    >
      {children}
    </span>
  );
}
