import { Fragment, useCallback } from 'react';
import { t } from 'i18next';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { InvitationStatus } from '@pasnik/api/data-transfer';

export interface AdminInvitationActionsProps {
  changeStatus: (email: string, status: InvitationStatus) => void;
  email: string;
}

export default function AdminInvitationActions({
  changeStatus,
  email,
}: AdminInvitationActionsProps) {
  const changeStatusHandler = useCallback(
    (event) => {
      const newStatus = event.currentTarget.value;
      changeStatus(email, newStatus);
    },
    [changeStatus, email]
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600">
          <span className="sr-only">{t('invitation.open')}</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <button
                onClick={changeStatusHandler}
                value={InvitationStatus.APPROVED}
                className="inline-flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                {t('invitation.approve')}
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={changeStatusHandler}
                value={InvitationStatus.REJECTED}
                className="inline-flex items-center w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-500"
              >
                <XIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                {t('invitation.reject')}
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
