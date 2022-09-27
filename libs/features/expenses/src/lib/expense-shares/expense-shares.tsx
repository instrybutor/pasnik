import { useCallback, useState } from 'react';
import {
  ExpenseModel,
  ShareModel,
  ShareType,
  UserModel,
  WorkspaceUserModel,
} from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';
import { Dictionary } from '@pasnik/shared/utils';
import { ExpenseShare } from './expense-share';

export type BaseExpenseShare = Pick<
  ShareModel,
  'share' | 'shareType' | 'workspaceUserId'
>;

export interface ExpenseSharesProps {
  users: Dictionary<WorkspaceUserModel<UserModel>>;
  expense: Pick<ExpenseModel, 'priceCents'>;
  shares: BaseExpenseShare[];
  onChange: (shares: BaseExpenseShare[]) => void;
  fixedShareType?: ShareType;
}

export function ExpenseShares({
  users,
  shares,
  expense,
  onChange,
  fixedShareType,
}: ExpenseSharesProps) {
  const { t } = useTranslation();
  const [selection, setSelected] = useState<Record<number, BaseExpenseShare>>(
    shares.reduce(
      (acc, val) => ({ ...acc, [val.workspaceUserId]: { ...val } }),
      {}
    )
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
    (userId: number, share: number, shareType: ShareType) => {
      const selectionCpy = { ...selection };
      if (!selectionCpy[userId] && !isNaN(share)) {
        selectionCpy[userId] = {
          share,
          shareType: fixedShareType ?? shareType,
          workspaceUserId: userId,
        };
      } else if (selectionCpy[userId] && !isNaN(share)) {
        selectionCpy[userId].share = share;
        selectionCpy[userId].shareType = fixedShareType ?? shareType;
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
        return NaN;
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

      return (expense.priceCents - amountSum) * (userShare.share / coefSum);
    },
    [selection, expense.priceCents]
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
                  setAmount(user.id, 1, ShareType.Coefficient);
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
          <ExpenseShare
            priceCents={calculateShare(user.id)}
            share={selection[user.id]?.share}
            shareType={selection[user.id]?.shareType}
            user={user.user}
            onChange={(share, shareType) => {
              setAmount(user.id, share, shareType);
            }}
          />
        ))
      )}
    </div>
  );
}
