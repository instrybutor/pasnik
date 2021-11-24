import { Fragment, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { matchPath, NavLink } from 'react-router-dom';
import {
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import { useUserStore } from '@pasnik/store';
import { SelectWorkspace } from '../select-workspace/select-workspace';
import { useLayoutStore } from '../layout.store';
import { AddWorkspaceModal } from '../add-workspace-modal/add-workspace-modal';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, exact: true },
  { name: 'Historia zamówień', href: '/history', icon: ClockIcon },
  { name: 'Balances', href: '/balances', icon: ScaleIcon, hide: true },
  { name: 'Cards', href: '/cards', icon: CreditCardIcon, hide: true },
  { name: 'Recipients', href: '/recipients', icon: UserGroupIcon, hide: true },
  { name: 'Reports', href: '/reports', icon: DocumentReportIcon, hide: true },
];

const adminNavigation = [
  {
    name: 'Zaproszenia',
    href: '/admin/invitations',
    icon: UserGroupIcon,
    exact: false,
  },
];

const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon, hide: true },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon, hide: true },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon, hide: true },
];

export interface SidebarProps {
  sidebarOpen: boolean;
  closeSidebar: () => void;
  version?: string;
}

export function Sidebar({ sidebarOpen, closeSidebar, version }: SidebarProps) {
  const { showAddWorkspaceModal } = useLayoutStore();
  const { user } = useUserStore();
  const isCurrentRoute = useCallback((href: string, exact?: boolean) => {
    return !!matchPath(window.location.pathname, { path: href, exact: exact });
  }, []);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={closeSidebar}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={closeSidebar}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-4xl text-cyan-100">
                  <span role="img" aria-label="food">
                    🍔
                  </span>{' '}
                  Paśnik
                </h1>
              </div>
              <nav
                className="mt-5 flex-grow divide-y divide-cyan-800 overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="px-2">
                  <SelectWorkspace onAddClick={showAddWorkspaceModal} />
                </div>
                <div className="px-2 space-y-1 mt-6 pt-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      exact={item.exact}
                      activeClassName="bg-cyan-800 text-white"
                      className={classNames(
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                        {
                          hidden: item.hide,
                          'bg-cyan-800 text-white': isCurrentRoute(
                            item.href,
                            item.exact
                          ),
                          'text-cyan-100 hover:text-white hover:bg-cyan-600':
                            !isCurrentRoute(item.href, item.exact),
                        }
                      )}
                      aria-current={
                        isCurrentRoute(item.href, item.exact)
                          ? 'page'
                          : undefined
                      }
                    >
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                {user?.isAdmin && (
                  <div className="mt-6 pt-6">
                    <div className="px-2 space-y-1">
                      {adminNavigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          exact={item.exact}
                          className={classNames(
                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
                            {
                              'bg-cyan-800 text-white': isCurrentRoute(
                                item.href,
                                item.exact
                              ),
                              'text-cyan-100 hover:text-white hover:bg-cyan-600':
                                !isCurrentRoute(item.href, item.exact),
                            }
                          )}
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 text-cyan-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    {secondaryNavigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600',
                          {
                            hidden: true,
                          }
                        )}
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 text-cyan-200"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </nav>
              <div className="mt-5 pt-5 text-center border-t border-cyan-800">
                <span className="text-cyan-100 mr-1">
                  Version:{' '}
                  <span className="bg-cyan-600 p-1 px-2 rounded text-white">
                    {version ?? 'Development'}
                  </span>
                </span>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-5 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 h-8 text-center">
              <h1 className="text-4xl text-cyan-100">
                <span role="img" aria-label="food">
                  🍔
                </span>{' '}
                Paśnik
              </h1>
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2">
                <SelectWorkspace onAddClick={showAddWorkspaceModal} />
              </div>

              <div className="px-2 space-y-1 mt-6 pt-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    exact={item.exact}
                    className={classNames(
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
                      {
                        hidden: item.hide,
                        'bg-cyan-800 text-white': isCurrentRoute(
                          item.href,
                          item.exact
                        ),
                        'text-cyan-100 hover:text-white hover:bg-cyan-600':
                          !isCurrentRoute(item.href, item.exact),
                      }
                    )}
                    aria-current={
                      isCurrentRoute(item.href, item.exact) ? 'page' : undefined
                    }
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </div>
              {user?.isAdmin && (
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    {adminNavigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
                          {
                            'bg-cyan-800 text-white': isCurrentRoute(item.href),
                            'text-cyan-100 hover:text-white hover:bg-cyan-600':
                              !isCurrentRoute(item.href),
                          }
                        )}
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 text-cyan-200"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-6 pt-6 flex-grow">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600',
                        { hidden: item.hide }
                      )}
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>
            <div className="mt-6 pt-6 text-center border-t border-cyan-800">
              <span className="text-cyan-100 mr-1">
                Version:{' '}
                <span className="bg-cyan-600 p-1 px-2 rounded text-white">
                  {version ?? 'Development'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <AddWorkspaceModal />
    </>
  );
}

export default Sidebar;
