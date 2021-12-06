import { HomeIcon } from '@heroicons/react/solid';
import { NavLink } from 'react-router-dom';
import { ReactElement } from 'react';
import { HeaderBreadcrumbsItem } from './header-breadcrumbs-item';
import { HeaderBreadcrumbsBack } from './header-breadcrumbs-back';

export interface HeaderBreadcrumbsProps {
  back?: () => ReactElement;
  children?: Array<ReactElement | undefined> | ReactElement;
}

export function HeaderBreadcrumbs({ children, back }: HeaderBreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      {back && <div className="flex sm:hidden">{back()}</div>}
      <div className="hidden sm:block">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <NavLink to="/" className="text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </NavLink>
            </div>
          </li>
          {children}
        </ol>
      </div>
    </nav>
  );
}

HeaderBreadcrumbs.Item = HeaderBreadcrumbsItem;
HeaderBreadcrumbs.Back = HeaderBreadcrumbsBack;
