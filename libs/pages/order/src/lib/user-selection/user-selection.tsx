import { Fragment, useCallback } from 'react';
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { UserModel } from '@pasnik/api/data-transfer';
import { UserAvatar, UserInfo, UserName } from '@pasnik/components';
import { CheckIcon } from '@heroicons/react/outline';
import { Select } from '@pasnik/components';
import { useWorkspaceUsers } from '@pasnik/features/workspaces';
import { useOrderFacade } from '../order-store/order.facade';

enum SelectionType {
  SLIM = 'slim',
  DEFAULT = 'default',
}

interface UserSelectionProps {
  user?: UserModel;
  type?: string;
  selectUser(user: UserModel): void;
}

export const UserSelection: React.FC<UserSelectionProps> = ({
  user,
  type = SelectionType.DEFAULT,
  children,
  selectUser,
}) => {
  const {
    orderQuery: { data: order },
  } = useOrderFacade();
  const { data } = useWorkspaceUsers(order?.workspace?.slug);
  const { t } = useTranslation();
  const users = data?.map((item) => item.user) ?? [];

  const handleUserSelection = useCallback(
    (selectedUser: UserModel) => {
      if (selectedUser.id !== user?.id) {
        selectUser(selectedUser);
      }
    },
    [user?.id, selectUser]
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
          {type === SelectionType.DEFAULT ? (
            <div className="ml-3 truncate">
              <UserName user={user} fallbackValue={t('dish.paying.pick_payer')}>
                {children}
              </UserName>
            </div>
          ) : null}
        </Fragment>
      </Select>
    </div>
  );
};
