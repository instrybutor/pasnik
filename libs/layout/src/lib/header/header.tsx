import { Suspense, useCallback } from 'react';
import { MenuAlt1Icon } from '@heroicons/react/outline';

import { NotificationsDropdown } from '../containers/notifications-dropdown';
import { HeaderProfileDropdown } from './header-profile-dropdown';
import { HeaderCreateOrderButton } from './header-create-order-button';
import { Can, WorkspacesAction } from '@pasnik/ability';

export interface HeaderProps {
  sidebarOpen: boolean;
  openSidebar: () => void;
}

export function Header({ openSidebar }: HeaderProps) {
  const openSidebarHandler = useCallback(() => {
    openSidebar();
  }, [openSidebar]);

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
        onClick={openSidebarHandler}
      >
        <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="flex-1 flex items-center xsm:justify-end">
          <Suspense
            fallback={
              <div className="skeleton h-10 w-40 text-center items-center px-4 py-2 border border-transparent shadow-sm" />
            }
          >
            <Can I={WorkspacesAction.CreateOrder} on="WorkspaceModel">
              <div className="flex space-x-3 flex-grow xsm:flex-grow-0 md:ml-4">
                <HeaderCreateOrderButton />
              </div>
            </Can>
          </Suspense>
        </div>
        <div className="flex items-center ml-3 gap-2">
          <NotificationsDropdown />
          <HeaderProfileDropdown />
        </div>
      </div>
    </div>
  );
}

export default Header;
