import { useCallback, useState } from 'react';
import {
  ShareDto,
  ShareType,
  UserModel,
  WorkspaceUserModel,
} from '@pasnik/api/data-transfer';
import { Price, UserInfo } from '@pasnik/components';
import { useTranslation } from 'react-i18next';
import { Dictionary } from '@pasnik/shared/utils';

export interface UsersDropdownProps {
  users: Dictionary<WorkspaceUserModel<UserModel>>;
  shares: ShareDto[];
  totalPriceCents: number;
  onChange: (shares: ShareDto[]) => void;
}

export function OrderShares({
  users,
  shares,
  totalPriceCents,
  onChange,
}: UsersDropdownProps) {
  const { t } = useTranslation();
  const [selection, setSelected] = useState<Record<number, ShareDto>>(
    shares.reduce((acc, val) => ({ ...acc, [val.workspaceUserId]: val }), {})
  );
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? Object.values(users)
      : Object.values(users).filter((user) =>
          user.user?.email
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const setAmount = useCallback(
    (userId: number, amount: number) => {
      const selectionCpy = { ...selection };
      if (!selectionCpy[userId] && !isNaN(amount)) {
        selectionCpy[userId] = {
          share: amount,
          shareType: ShareType.Coefficient,
          workspaceUserId: userId,
        };
      } else if (selectionCpy[userId] && !isNaN(amount)) {
        selectionCpy[userId].share = amount;
      } else {
        delete selectionCpy[userId];
      }
      setSelected(selectionCpy);

      onChange(Object.values(selectionCpy));
    },
    [selection, onChange]
  );

  const calculateShare = useCallback(
    (userId: number) => {
      const userShare = selection[userId];
      if (!userShare) {
        return null;
      }
      if (userShare.shareType === ShareType.Amount) {
        return userShare.share;
      }
      const coefSum = Object.values(selection).reduce((acc, share) => {
        if (share.shareType === ShareType.Coefficient) {
          return acc + share.share;
        }
        return acc;
      }, 0);

      const amountSum = Object.values(selection).reduce((acc, share) => {
        if (share.shareType === ShareType.Amount) {
          return acc + share.share;
        }
        return acc;
      }, 0);

      return (totalPriceCents - amountSum) * (userShare.share / coefSum);
    },
    [selection, totalPriceCents]
  );

  return (
    <div className="overflow-auto text-base sm:text-sm pr-1">
      <div className="relative w-full flex items-center">
        <input
          className="w-full border-none py-2 pl-2 pr-3 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
          placeholder="Szukaj..."
          onChange={({ currentTarget: { value } }) => setQuery(value)}
          value={query}
          autoFocus={true}
        />
        <input
          checked={Object.keys(selection).length === Object.keys(users).length}
          type="checkbox"
          className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
          onChange={({ currentTarget: { checked } }) => {
            if (checked) {
              Object.values(users).forEach((user) => {
                if (!selection[user.id]) {
                  setAmount(user.id, 1);
                }
              });
            } else {
              setSelected([]);
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
          <div
            key={user.id}
            className="relative cursor-default select-none py-2 flex items-center text-gray-900"
          >
            <span className="block truncate flex-1">
              <UserInfo size="sm" user={user?.user}>
                Udział: <Price priceCents={calculateShare(user.id)} />
              </UserInfo>
            </span>
            <div className="ml-2 relative">
              <input
                value={selection[user.id]?.share ?? ''}
                onChange={({ currentTarget: { value } }) => {
                  if (!isNaN(+value)) {
                    setAmount(user.id, +value);
                  }
                }}
                className={`w-8  bg-transparent text-center pl-1 pr-1 text-sm leading-5 outline-none border-b border-gray-500`}
              />
              <button
                onClick={() => {
                  if (selection[user.id].shareType === ShareType.Coefficient) {
                    selection[user.id].shareType = ShareType.Amount;
                  } else {
                    selection[user.id].shareType = ShareType.Coefficient;
                  }
                  setSelected({ ...selection });
                }}
                className="absolute -bottom-3.5 uppercase font-bold text-[0.6rem] leading-3 text-gray-400 text-center inset-x-0"
              >
                {selection[user.id]?.shareType !== ShareType.Amount && 'Mnoż'}
                {selection[user.id]?.shareType === ShareType.Amount && 'Ilość'}
              </button>
            </div>
            <div className="ml-3 flex items-center h-5">
              <input
                value={user.id}
                checked={!!selection[user.id]}
                onChange={({ currentTarget: { checked } }) => {
                  if (checked) {
                    setAmount(user.id, 1);
                  } else {
                    setAmount(user.id, NaN);
                  }
                }}
                type="checkbox"
                className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
