import { Fragment, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ClockIcon,
  CogIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import { useLayoutStore } from '../layout.store';
import {
  CreateWorkspaceDrawer,
  SelectWorkspaceDropdown,
  SelectWorkspaceDropdownSkeleton,
} from '@pasnik/features/workspaces';
import { SidebarItem } from '../components/sidebar-item/sidebar-item';
import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { Can, UsersAction } from '@pasnik/ability';
import { SidebarWorkspaceItem } from './sidebar-workspace-item';
import { useChangeWorkspaceMutation } from '@pasnik/auth';
import { QueryBoundary } from '@pasnik/components';

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
  const {
    showAddWorkspaceModal,
    hideAddWorkspaceModal,
    addWorkspaceModalOpen,
  } = useLayoutStore();
  const { mutateAsync: changeWorkspace } = useChangeWorkspaceMutation();
  const navigate = useNavigate();

  const onCreateWorkspaceSuccess = useCallback(
    async (workspace: WorkspaceModel) => {
      await changeWorkspace(workspace);
      hideAddWorkspaceModal();
      navigate(`/workspace/${workspace.slug}`);
    },
    [navigate, changeWorkspace, hideAddWorkspaceModal]
  );

  const onChangeWorkspace = useCallback(
    async (workspace: WorkspaceModel) => {
      await changeWorkspace(workspace);
      navigate(`/workspace/${workspace.slug}`);
    },
    [navigate, changeWorkspace]
  );

  const onAddWorkspace = useCallback(async () => {
    closeSidebar();
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 355);
    }).then(showAddWorkspaceModal);
  }, [showAddWorkspaceModal, closeSidebar]);

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
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
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
            <div className="relative flex-1 flex flex-col w-full pt-5 pb-4 bg-cyan-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 mr-2 pt-2">
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
                  <SelectWorkspaceDropdown
                    onChange={onChangeWorkspace}
                    onAddClick={onAddWorkspace}
                  />
                </div>
                <div className="px-2 space-y-1 mt-6 pt-6">
                  <SidebarItem to="/" icon={HomeIcon} label="Dashboard" />
                  <SidebarWorkspaceItem />
                  <SidebarItem
                    to="/history"
                    icon={ClockIcon}
                    label="Historia zamówień"
                  />
                </div>
                <Can I={UsersAction.ApproveAccess} on="UserModel">
                  <div className="mt-6 pt-6">
                    <div className="px-2 space-y-1">
                      <SidebarItem
                        to="/admin/invitations"
                        icon={UserGroupIcon}
                        label="Zaproszenia"
                      />
                    </div>
                  </div>
                </Can>
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
              className="flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto mt-5"
              aria-label="Sidebar"
            >
              <div className="px-2">
                <QueryBoundary fallback={<SelectWorkspaceDropdownSkeleton />}>
                  <SelectWorkspaceDropdown
                    onChange={onChangeWorkspace}
                    onAddClick={showAddWorkspaceModal}
                  />
                </QueryBoundary>
              </div>
              <div className="px-2 space-y-1 mt-6 pt-6">
                <SidebarItem to="/" icon={HomeIcon} label="Dashboard" />
                <SidebarWorkspaceItem />
                <SidebarItem
                  to="/history"
                  icon={ClockIcon}
                  label="Historia zamówień"
                />
              </div>

              <Can I={UsersAction.ApproveAccess} on="UserModel">
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    <SidebarItem
                      to="/admin/invitations"
                      icon={UserGroupIcon}
                      label="Zaproszenia"
                    />
                  </div>
                </div>
              </Can>

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
      <CreateWorkspaceDrawer
        isOpen={addWorkspaceModalOpen}
        onSuccess={onCreateWorkspaceSuccess}
        onCancel={hideAddWorkspaceModal}
      />
    </>
  );
}

export default Sidebar;
