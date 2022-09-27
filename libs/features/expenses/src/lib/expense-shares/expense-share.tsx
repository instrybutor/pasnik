import { Price, UserInfo } from '@pasnik/components';
import { ShareType, UserModel } from '@pasnik/api/data-transfer';

export interface ExpenseShareProps {
  priceCents: number;
  share?: number;
  shareType?: ShareType;
  user: UserModel;
  onChange(share: number, shareType: ShareType): void;
}

export function ExpenseShare({
  user,
  share,
  shareType,
  priceCents,
  onChange,
}: ExpenseShareProps) {
  return (
    <div className="relative cursor-default select-none py-2 flex items-center text-gray-900">
      <span className="block truncate flex-1">
        <UserInfo size="sm" user={user}>
          Udział: <Price priceCents={isNaN(priceCents) ? 0 : priceCents} />
        </UserInfo>
      </span>
      <div className="ml-2 relative">
        <input
          value={share ?? ''}
          onChange={({ currentTarget: { value } }) => {
            if (!isNaN(+value)) {
              onChange(
                value ? +value : NaN,
                shareType ?? ShareType.Coefficient
              );
            }
          }}
          className={`w-8  bg-transparent text-center pl-1 pr-1 text-sm leading-5 outline-none border-b border-gray-500`}
        />
        <button
          onClick={() => {
            onChange(
              share ?? NaN,
              shareType === ShareType.Coefficient
                ? ShareType.Amount
                : ShareType.Coefficient
            );
          }}
          className="absolute -bottom-3.5 uppercase font-bold text-[0.6rem] leading-3 text-gray-400 text-center inset-x-0"
        >
          {shareType !== ShareType.Amount && 'Mnoż'}
          {shareType === ShareType.Amount && 'Ilość'}
        </button>
      </div>
      <div className="ml-3 flex items-center h-5">
        <input
          value={user.id}
          checked={!!share}
          onChange={({ currentTarget: { checked } }) => {
            if (checked) {
              onChange(1, ShareType.Coefficient);
            } else {
              onChange(NaN, ShareType.Coefficient);
            }
          }}
          type="checkbox"
          className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
        />
      </div>
    </div>
  );
}
