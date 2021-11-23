import { UserModel } from '@pasnik/api/data-transfer';
import { Price, UserAvatar, UserInfo, UserName } from '@pasnik/components';
import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useCallback } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { useUserStore } from '@pasnik/store';

export interface OrderPaymentProps {
  totalCents: number;
  setPayer: (payerId: number) => void;
  payer?: UserModel | null;
}

export function OrderSelectPayer({
  payer,
  totalCents,
  setPayer,
}: OrderPaymentProps) {
  const { users } = useUserStore();

  const setPayerHandler = useCallback(
    (newPayer: UserModel) => {
      if (newPayer.id !== payer?.id) {
        setPayer(newPayer.id);
      }
    },
    [setPayer, payer]
  );
  return (
    <div className="flex items-center">
      <Listbox value={payer} onChange={setPayerHandler}>
        <div className="relative">
          <Listbox.Button className="relative w-full bg-white rounded-md pl-3 pr-10 py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500">
            <div className="flex items-center">
              <UserAvatar user={payer} />
              <div className="ml-3 truncate">
                <UserName user={payer} fallbackValue="Wybierz płacącego">
                  <Price priceCents={totalCents} />
                </UserName>
              </div>
            </div>
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
                      active ? 'text-white bg-cyan-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <div
                        className={classNames(
                          {
                            'font-semibold': selected,
                            'font-normal': !selected,
                          },
                          'flex items-center'
                        )}
                      >
                        <UserInfo user={person} size="xsm" />
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            {
                              'text-white': active,
                              'text-cyan-600': !active,
                            },
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
    </div>
  );
}

export default OrderSelectPayer;
