import { ReactElement, useState } from 'react';
import { Combobox } from '@headlessui/react';
import {
  AddPayerToOrderDto,
  UserModel,
  WorkspaceUserModel,
} from '@pasnik/api/data-transfer';
import { UserInfo } from '@pasnik/components';
import { Float } from '@headlessui-float/react';
import { useTranslation } from 'react-i18next';

export interface UsersDropdownButtonProps {
  user?: UserModel;
}

export interface UsersDropdownProps {
  users: WorkspaceUserModel[];
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
  const [selection, setSelected] = useState<Record<number, AddPayerToOrderDto>>(
    {}
  );
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? users
      : users.filter((user) =>
          user.user?.email
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <Combobox
      multiple={true}
      value={[selection]}
      onChange={(value: Record<number, AddPayerToOrderDto>[]) => {
        console.log(value);
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
              {button({ user: undefined })}
            </Combobox.Button>
          </div>
          <Combobox.Options className="mt-1 w-68 max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div className="relative w-full flex pl-2 pr-4 items-center">
              <Combobox.Input
                className="w-full border-none py-2 pl-2 pr-3 text-sm leading-5 text-gray-900 focus:ring-0"
                placeholder="Szukaj..."
                onChange={({ currentTarget: { value } }) => setQuery(value)}
              />
              <input
                checked={Object.keys(selection).length === users.length}
                type="checkbox"
                className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                onChange={({ currentTarget: { checked } }) => {
                  if (checked) {
                    const newSelection = { ...selection };
                    users.forEach((user) => {
                      if (!newSelection[user.id]) {
                        newSelection[user.id] = {
                          workspaceUserId: user.id,
                          amountCents: 1,
                        };
                      }
                    });
                    setSelected(newSelection);
                  } else {
                    setSelected({});
                  }
                }}
              />
            </div>
            {filteredPeople.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                {t('components.not_found')}
              </div>
            ) : (
              filteredPeople.map((user) => (
                <Combobox.Option
                  key={user.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pr-4 pl-4 flex items-center text-gray-900`
                  }
                  value={{
                    [user.id]: {
                      workspaceUserId: user.id,
                      amountCents: 1,
                      user,
                    },
                  }}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate flex-1 ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        <UserInfo size="sm" user={user?.user} />
                      </span>
                      <input
                        value={selection[user.id]?.amountCents ?? ''}
                        onChange={({ currentTarget: { value } }) => {
                          selection[user.id].amountCents = +value;
                        }}
                        className={`ml-2 w-8 bg-transparent text-center pl-2 pr-2 text-sm leading-5 outline-none border-b border-gray-500`}
                      />
                      <div className="ml-3 flex items-center h-5">
                        <input
                          value={user.id}
                          checked={!!selection[user.id]}
                          onChange={({ currentTarget: { checked } }) => {
                            if (checked) {
                              setSelected({
                                ...selection,
                                [user.id]: {
                                  workspaceUserId: user.id,
                                  amountCents: 1,
                                },
                              });
                            } else {
                              const newSelection = { ...selection };
                              delete newSelection[user.id];
                              setSelected(newSelection);
                            }
                          }}
                          type="checkbox"
                          className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                        />
                      </div>
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
