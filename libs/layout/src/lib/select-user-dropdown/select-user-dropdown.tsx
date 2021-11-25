import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { UserInfo } from '@pasnik/components';
import { UserModel } from '@pasnik/api/data-transfer';
import classNames from 'classnames';

export interface SelectUserDropdownProps {
  users: UserModel[];
  children?: JSX.Element;
  onSelect: (user: UserModel) => void;
}

export function SelectUserDropdown({
  users,
  children,
  onSelect,
}: SelectUserDropdownProps) {
  return (
    <Listbox value={null} onChange={onSelect}>
      {({ open }) => (
        <div className="mt-1 relative">
          <Listbox.Button className="relative w-full bg-white cursor-default">
            {children}
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {users.map((user) => (
                <Listbox.Option
                  key={user.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={user}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <UserInfo user={user} />
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
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
      )}
    </Listbox>
  );
}
