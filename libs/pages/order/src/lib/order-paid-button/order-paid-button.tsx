import { Fragment, useCallback, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { CashIcon } from '@heroicons/react/outline';
import { UserModel } from '@pasnik/api/data-transfer';
import { t } from 'i18next';

export interface OrderPaidButtonProps {
  onClick?: (payer: UserModel) => void;
  users: UserModel[];
  selectedUser?: UserModel;
}

const getName = (user: UserModel) => {
  if (user.familyName && user.givenName) {
    return `${user.givenName} ${user.familyName}`;
  }
  return user.email;
};

export function OrderPaidButton({
  users,
  onClick,
  selectedUser,
}: OrderPaidButtonProps) {
  const [selected, setSelected] = useState(selectedUser);

  const selectHandler = useCallback(
    (user: UserModel) => {
      setSelected(user);
      onClick && onClick(user);
    },
    [onClick]
  );

  return (
    <Listbox value={selected} onChange={selectHandler}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            {t('dish.paying.title')}
          </Listbox.Label>
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-yellow-600">
              <div className="group relative z-0 inline-flex shadow-sm rounded-md divide-x divide-yellow-600">
                <button className="relative inline-flex items-center py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                  <CashIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">
                    {t('dish.paying.payed_by')}{' '}
                    {selected
                      ? getName(selected)
                      : ` ${t('dish.paying.myself')}`}
                  </p>
                </button>
                <Listbox.Button className="relative inline-flex items-center bg-yellow-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-yellow-500">
                  <span className="sr-only">{t('dish.paying.title')}</span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="origin-top-right absolute left-0 mt-2 -mr-1 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                {users.map((user) => (
                  <Listbox.Option
                    key={user.id}
                    className={({ active }) =>
                      classNames(
                        {
                          'text-white bg-yellow-500': active,
                          'text-gray-900': !active,
                        },
                        'cursor-default select-none relative p-4 text-sm'
                      )
                    }
                    value={user}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={classNames({
                              'font-semibold': selected,
                              'font-normal': !selected,
                            })}
                          >
                            {getName(user)}
                          </p>
                          {selected ? (
                            <span
                              className={classNames({
                                'text-white': active,
                                'text-yellow-500': !active,
                              })}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default OrderPaidButton;
