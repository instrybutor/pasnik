import classNames from 'classnames';
import { NavLinkWithParam } from '../nav-link-with-param/nav-link-with-param';
import { NavLinkProps } from 'react-router-dom';

export interface TabLinkProps extends NavLinkProps {
  count?: number;
}

export function TabLink({ count, children, ...rest }: TabLinkProps) {
  return (
    <NavLinkWithParam
      {...rest}
      className={({ isActive }) =>
        classNames(
          'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
          {
            'border-cyan-500 text-cyan-600': isActive,
            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200':
              !isActive,
          }
        )
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {count !== undefined && (
            <span
              className={classNames(
                'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block',
                {
                  'bg-cyan-100 text-cyan-600': isActive,
                  'bg-gray-100 text-gray-900': !isActive,
                }
              )}
            >
              {count}
            </span>
          )}
        </>
      )}
    </NavLinkWithParam>
  );
}
