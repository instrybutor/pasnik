import { NavLink, NavLinkProps } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { PropsWithChildren } from 'react';

export function HeaderBreadcrumbsItem({
  children,
  ...rest
}: PropsWithChildren<NavLinkProps>) {
  return (
    <li>
      <div className="flex items-center">
        <ChevronRightIcon
          className="flex-shrink-0 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />

        <NavLink
          {...rest}
          className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          {children}
        </NavLink>
      </div>
    </li>
  );
}
