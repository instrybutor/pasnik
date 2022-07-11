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
      end={true}
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
    <Disclosure
      as="div"
      className="space-y-1 bg-gray-800 rounded-md p-1"
      defaultOpen={true}
    >
      {({ open }) => (
        <>
          <div
            className={classNames(
              // item.current
              //   ? 'bg-gray-100 text-gray-900'
              //   : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group w-full flex items-center pl-2 pr-1 py-2 text-left rounded-md focus:outline-none text-cyan-100 cursor-pointer'
            )}
          >
            {Icon && (
              <Icon
                className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                aria-hidden="true"
              />
            )}
            <span className="flex-1">{label}</span>
          </div>
          <Disclosure.Panel className="space-y-1">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
