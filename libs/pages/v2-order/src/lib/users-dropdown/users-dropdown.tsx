import { ReactElement, useMemo, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { UserModel } from '@pasnik/api/data-transfer';
import { UserInfo } from '@pasnik/components';
import { Float } from '@headlessui-float/react';
import { useTranslation } from 'react-i18next';

export interface UsersDropdownButtonProps {
  user?: UserModel;
}

export interface UsersDropdownProps {
  users: UserModel[];
  userId: number;
  button: (props: UsersDropdownButtonProps) => ReactElement;
  onChange: (value: number) => void;
}

export function UsersDropdown({
  users,
  userId,
  button,
  onChange,
}: UsersDropdownProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(userId);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? users
      : users.filter((user) =>
          user.email
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const selectedUser = useMemo(
    () => users.find(({ id }) => selected === id),
    [users, selected]
  );

  return (
    <Combobox
      value={selectedUser}
      onChange={({ id }: UserModel) => {
        setSelected(id);
        onChange(id);
      }}
    >
      <div className="relative">
        <Float
          placement="bottom"
          shift={true}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          onHide={() => {
            setQuery('');
          }}
          portal
        >
          <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-300 focus-visible:ring-cyan-500 sm:text-sm">
            <Combobox.Button className="flex">
              {button({ user: selectedUser })}
            </Combobox.Button>
          </div>
          <Combobox.Options className="mt-1 w-56 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              placeholder="Szukaj..."
              onChange={(event) => setQuery(event.target.value)}
            />
            {filteredPeople.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                {t('components.not_found')}
              </div>
            ) : (
              filteredPeople.map((user) => (
                <Combobox.Option
                  key={user.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pr-10 pl-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={user}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        <UserInfo size="sm" user={user} />
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Float>
      </div>
    </Combobox>
  );
}
