import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { UserModel } from '@pasnik/api/data-transfer';
import { UserAvatar, UserInfo } from '@pasnik/components';

export interface OrderDishProps {
  user: UserModel;
}

export function OrderDishUser({ user }: OrderDishProps) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group block bg-white rounded-full h-6 w-6 items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
            )}
          >
            <div className="flex items-center space-x-2">
              <div className="flex flex-shrink-0 -space-x-1">
                <UserAvatar size="xsm" user={user} />
              </div>
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-4 py-2">
                  <UserInfo user={user} size="sm" />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default OrderDishUser;
