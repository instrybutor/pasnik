import classNames from 'classnames';
import { NavLink, NavLinkProps } from 'react-router-dom';
import React from 'react';

export interface SidebarItemProps extends NavLinkProps {
  children?: JSX.Element | string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export function SidebarItem({
  icon: Icon,
  children,
  ...props
}: SidebarItemProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        classNames(
          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
          {
            'bg-cyan-800 text-white': isActive,
            'text-cyan-100 hover:text-white hover:bg-cyan-600': !isActive,
          }
        )
      }
    >
      {Icon ? (
        <Icon
          className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </NavLink>
  );
}
