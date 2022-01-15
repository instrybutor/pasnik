import { Fragment } from 'react';
import i18next from 'i18next';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, isBefore } from 'date-fns';
import { pl } from 'date-fns/locale';

import { Popover, Transition } from '@headlessui/react';
import { BellIcon, TruckIcon } from '@heroicons/react/outline';

import { useNotificationsQuery } from '@pasnik/shared/notification';

const LAST_SEEN_DATE = new Date('2022/1/13 10:00');

export const NotificationsDropdown = () => {
  const { data: notifications } = useNotificationsQuery();

  return (
    <Popover as="div" className="relative">
      <Popover.Button className="animate-wiggle ml-3 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>
      <span className="flex h-3 w-3 absolute top-0 right-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
      </span>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col w-96">
          {notifications!.map((notification, index) => (
            <Link
              key={new Date(notification.createdAt).getTime() + index}
              to={`/order/${notification.data.slug}`}
              className={classnames(
                'flex items-center px-4 py-3 border-b hover:bg-gray-100',
                {
                  'opacity-50': isBefore(
                    new Date(notification.createdAt),
                    new Date(LAST_SEEN_DATE)
                  ),
                }
              )}
            >
              <TruckIcon className="h-8 w-8 object-cover mx-1 text-sky-400" />
              <div className="text-gray-600 text-sm mx-2">
                <div className="font-bold">
                  {i18next.t('notifications.orderStatusChanged', {
                    placeName: notification.data.title,
                    status: i18next.t(`orderStatus.${notification.status}`),
                  })}
                </div>
                <div className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                    locale: pl,
                  })}
                </div>
              </div>
            </Link>
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
