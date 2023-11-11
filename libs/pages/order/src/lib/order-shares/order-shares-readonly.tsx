import { useCallback, useMemo } from 'react';
import {
  ShareDto,
  ShareType,
  WorkspaceUserModel,
} from '@pasnik/api/data-transfer';
import { Price, UserInfo } from '@pasnik/components';

export interface OrderSharesReadonlyProps {
  users: WorkspaceUserModel[];
  shares: ShareDto[];
  totalPriceCents: number;
}

export function OrderSharesReadonly({
  users,
  shares,
  totalPriceCents,
}: OrderSharesReadonlyProps) {
  const coefSum = useMemo(
    () =>
      shares.reduce((acc, share) => {
        if (share.shareType === ShareType.Coefficient) {
          return acc + share.share;
        }
        return acc;
      }, 0),
    [shares]
  );

  const calculateShare = useCallback(
    (userId: number) => {
      const userShare = shares.find(
        ({ workspaceUserId }) => workspaceUserId === userId
      );
      if (!userShare) {
        return null;
      }
      if (userShare.shareType === ShareType.Amount) {
        return userShare.share;
      }

      return totalPriceCents * (userShare.share / coefSum);
    },
    [shares, totalPriceCents, coefSum]
  );

  const workspaceUsers = useMemo(() => {
    return users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<string, WorkspaceUserModel>);
  }, [users]);

  return (
    <div className="mt-1 w-68 max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {shares.map((share) => (
        <div
          key={share.id}
          className="relative cursor-default select-none py-2 pr-4 pl-4 flex items-center text-gray-900"
        >
          <span className="block truncate flex-1" tabIndex={0}>
            <UserInfo
              size="sm"
              user={workspaceUsers[share.workspaceUserId]?.user}
            >
              Udział:{' '}
              <Price priceCents={calculateShare(share.workspaceUserId)} />
            </UserInfo>
          </span>
        </div>
      ))}
    </div>
  );
}
