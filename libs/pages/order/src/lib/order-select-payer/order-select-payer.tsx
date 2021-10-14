import { UserModel } from '@pasnik/api/data-transfer';
import { Price, UserAvatar, UserInfo } from '@pasnik/components';
import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useCallback } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { useAuth } from '@pasnik/shared/utils-auth';

export interface OrderPaymentProps {
  payer?: UserModel | null;
  shippingCents: number;
  totalCents: number;
  users: UserModel[];
}

export function OrderSelectPayer({
  payer,
  shippingCents,
  totalCents,
  users,
}: OrderPaymentProps) {
  const { users } = useAuth();
  const setSelected = useCallback(() => {
    console.log('asd');
  }, []);
  return (
    <div className="flex items-center">
      <UserAvatar user={payer} />
      <div className="ml-3">
        <div className="inline-flex">
          <Listbox value={payer} onChange={setSelected}>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              Assigned to
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <img
                    src={selected.avatar}
                    alt=""
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {users.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'flex items-center'
                            )}
                          >
                            <UserInfo user={person} />
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
            <Price priceCents={-shippingCents - totalCents} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSelectPayer;
