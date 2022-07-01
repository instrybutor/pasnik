import classNames from 'classnames';
import { NavLink, NavLinkProps, To } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { Disclosure } from '@headlessui/react';

export interface SidebarItemProps extends NavLinkProps {
  children?: ReactElement | ReactElement[];
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  label: string;
  to: To;
  forceActive?: boolean;
}

export function SidebarItem({
  icon: Icon,
  children,
  label,
  to,
  forceActive,
}: SidebarItemProps) {
  return !children ? (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
          {
            'bg-cyan-800 text-white': forceActive || isActive,
            'text-cyan-100 hover:text-white hover:bg-cyan-600':
              !isActive && !forceActive,
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
      <span className="truncate">{label}</span>
    </NavLink>
  ) : (
    <Disclosure as="div" className="space-y-1">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              // item.current
              //   ? 'bg-gray-100 text-gray-900'
              //   : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none text-cyan-100 hover:text-white hover:bg-cyan-600'
            )}
          >
            {Icon && (
              <Icon
                className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                aria-hidden="true"
              />
            )}
            <span className="flex-1">{label}</span>
            <svg
              className={classNames(
                open ? 'text-cyan-400 rotate-90' : 'text-cyan-300',
                'ml-3 flex-shrink-0 h-5 w-5 transform transition-colors ease-in-out duration-150'
              )}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="space-y-1">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
