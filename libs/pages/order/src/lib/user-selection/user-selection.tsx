import React, { Fragment, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { UserModel } from '@pasnik/api/data-transfer';
import { Select, UserAvatar, UserInfo, UserName } from '@pasnik/components';
import { CheckIcon } from '@heroicons/react/outline';

enum SelectionType {
  SLIM = 'slim',
  DEFAULT = 'default',
}

interface UserSelectionProps {
  userId?: number;
  users: UserModel[];
  type?: string;
  selectUser(userId: number): void;
}

export const UserSelection: React.FC<UserSelectionProps> = ({
  userId,
  users,
  type = SelectionType.DEFAULT,
  children,
  selectUser,
}) => {
  const { t } = useTranslation();

  const handleUserSelection = useCallback(
    (selectedUser: UserModel) => {
      if (selectedUser.id !== userId) {
        selectUser(selectedUser.id);
      }
    },
    [userId, selectUser]
  );

  const user = useMemo(
    () => users.find(({ id }) => id === userId),
    [userId, users]
  );

  return (
    <div className="flex justify-center">
      <Select
        items={users}
        selected={user}
        keyExtraction={(item) => `${item?.id}`}
        onSelect={handleUserSelection}
        renderItem={({ selected, active, item }) => (
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
              <UserInfo user={item} size="xsm" />
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
      >
        <Fragment>
          <UserAvatar user={user} size="sm" />
          {type === SelectionType.DEFAULT && (
            <div className="ml-3 truncate">
              <UserName user={user} fallbackValue={t('dish.paying.pick_payer')}>
                {children}
              </UserName>
            </div>
          )}
        </Fragment>
      </Select>
    </div>
  );
};
