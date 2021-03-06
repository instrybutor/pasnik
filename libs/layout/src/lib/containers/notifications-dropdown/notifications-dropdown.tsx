import { Fragment } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { isAfter } from 'date-fns';
import { Popover, Transition } from '@headlessui/react';
import {
  BellIcon,
  EmojiHappyIcon,
  ExclamationIcon,
  InformationCircleIcon,
  TruckIcon,
} from '@heroicons/react/outline';

import { OrderStatus } from '@pasnik/api/data-transfer';
import { useNotificationsDropdown } from './notifications-dropdown.hook';
import { DateDistance } from '@pasnik/components';
import { useTranslation } from 'react-i18next';

const NOTIFICATION_ICON_MAPPER: Record<string, JSX.Element> = {
  [OrderStatus.Ordered]: (
    <TruckIcon className="h-8 w-8 object-cover mx-1 text-lime-400" />
  ),
  [OrderStatus.Canceled]: (
    <ExclamationIcon className="h-8 w-8 object-cover mx-1 text-red-400" />
  ),
  [OrderStatus.Delivered]: (
    <EmojiHappyIcon className="h-8 w-8 object-cover mx-1 text-sky-400" />
  ),
  [OrderStatus.InProgress]: (
    <InformationCircleIcon className="h-8 w-8 object-cover mx-1 text-sky-400" />
  ),
};

const NotificationIcon = ({ status }: { status?: OrderStatus }) => {
  if (!status) {
    return null;
  }

  return NOTIFICATION_ICON_MAPPER[status] ?? null;
};

export const NotificationsDropdown = () => {
  const { t } = useTranslation();
  const {
    hasNewNotifications,
    notifications,
    popoverRef,
    lastSeenDate,
    onPopoverClose,
  } = useNotificationsDropdown();

  return (
    <Popover as="div" className="relative">
      <Popover.Button
        ref={popoverRef}
        disabled={!notifications?.length}
        className={classnames(
          'bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500',
          { 'animate-wiggle': hasNewNotifications }
        )}
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>
      {hasNewNotifications ? (
        <span className="flex h-3 w-3 absolute top-0 right-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
      ) : null}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        afterLeave={onPopoverClose}
      >
        <Popover.Panel className="origin-top-right fixed w-screen h-screen right-0 mt-2 md:rounded-md md:shadow-md py-1 bg-white ring-1 ring-gray-900 ring-opacity-10 focus:outline-none flex flex-col md:w-96 md:h-auto md:absolute">
          {notifications?.map((notification, index) => (
            <Link
              key={notification.id}
              to={`/order/${notification.data?.slug}`}
              className={classnames(
                'flex items-center px-4 py-3 hover:bg-gray-100',
                {
                  'border-b': index < notifications!.length - 1,
                }
              )}
            >
              <NotificationIcon status={notification.data?.status} />
              <div className="text-gray-600 text-sm mx-2">
                <div
                  className={classnames(
                    isAfter(new Date(notification.createdAt), lastSeenDate)
                      ? 'font-semibold'
                      : 'font-light'
                  )}
                >
                  {t('notifications.orderStatusChanged', {
                    placeName: notification.data?.from,
                    status: t(`orderStatus.${notification.data?.status}`),
                  })}
                </div>
                <div className="text-xs text-gray-400 font-thin">
                  <DateDistance date={notification.createdAt} />
                </div>
              </div>
            </Link>
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
