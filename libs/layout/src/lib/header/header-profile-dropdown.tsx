import { Menu, Transition } from '@headlessui/react';
import { ButtonMutate, UserAvatar, UserName } from '@pasnik/components';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import classNames from 'classnames';
import { useCurrentUser, useLogoutLogout } from '@pasnik/auth';
import { useTranslation } from 'react-i18next';

export function HeaderProfileDropdown() {
  const { t } = useTranslation();
  const { user } = useCurrentUser();
  const logoutMutation = useLogoutLogout();
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
          <UserAvatar user={user} size="sm" />

          <div className="sm:w-36 hidden lg:flex items-center ml-3 justify-between">
            <span className="text-gray-700 text-sm font-medium flex-1 truncate">
              <UserName user={user} />
            </span>
            <ChevronDownIcon
              className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
              aria-hidden="true"
            />
          </div>
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
              <ButtonMutate
                rounded="none"
                color="none"
                mutation={logoutMutation}
                className={classNames(
                  { 'bg-gray-100': active },
                  'w-full px-4 py-2 text-sm text-gray-700'
                )}
              >
                {t('actions.logout')}
              </ButtonMutate>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
