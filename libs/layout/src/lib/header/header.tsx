import { Fragment, useCallback } from 'react';
import i18next from 'i18next';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { MenuAlt1Icon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

import { useAuth } from '@pasnik/auth';
import { useUserStore } from '@pasnik/store';
import { UserAvatar, UserName } from '@pasnik/components';

import { NotificationsDropdown } from '../containers/notifications-dropdown';

export interface HeaderProps {
  sidebarOpen: boolean;
  openSidebar: () => void;
}

export function Header({ openSidebar }: HeaderProps) {
  const { signOut } = useAuth();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const openSidebarHandler = useCallback(() => {
    openSidebar();
  }, [openSidebar]);

  const logoutClickHandler = useCallback(() => {
    signOut();
  }, [signOut]);

  const createOrderHandler = useCallback(() => {
    navigate('/create-order');
  }, [navigate]);

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
        onClick={openSidebarHandler}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="flex-1 flex items-center" />
        <div className="flex items-center md:ml-6 gap-4">
          <div className="flex space-x-3 md:ml-4">
            <button
              type="button"
              onClick={createOrderHandler}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              {i18next.t('header.create_order')}
            </button>
          </div>

          {/* Notification dropdown */}
          <NotificationsDropdown />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                <UserAvatar user={user} size="sm" />

                <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                  <span className="sr-only">Open user menu for </span>
                  <UserName user={user} />
                </span>
                <ChevronDownIcon
                  className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        {
                          'bg-gray-100': active,
                        },
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Your Profile
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        {
                          'bg-gray-100': active,
                        },
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Settings
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutClickHandler}
                      className={classNames(
                        { 'bg-gray-100': active },
                        'text-left w-full',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
