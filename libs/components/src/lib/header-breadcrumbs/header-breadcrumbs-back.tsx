import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { ReactElement } from 'react';

export type HeaderBreadcrumbsBackProps = NavLinkProps & {
  children: ReactElement | string | ReactElement[] | string[];
};

export function HeaderBreadcrumbsBack({
  children,
  ...rest
}: HeaderBreadcrumbsBackProps) {
  return (
    <NavLink
      {...rest}
      className="group inline-flex space-x-3 text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      <ArrowNarrowLeftIcon
        className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-600"
        aria-hidden="true"
      />
      <span>{children}</span>
    </NavLink>
  );
}
