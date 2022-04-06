import { UserInfo } from '@pasnik/components';
import { Control, Controller } from 'react-hook-form';
import { AddMembersToWorkspaceDto } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';

export interface WorkspaceUserInviteItemProps {
  control: Control<AddMembersToWorkspaceDto>;
  name: `members.${number}.email`;
  remove: () => void;
}

export function WorkspaceUserInviteItem({
  control,
  name,
  remove,
}: WorkspaceUserInviteItemProps) {
  const { t } = useTranslation();
  return (
    <li className="py-3 flex justify-between items-center">
      <Controller
        control={control}
        name={name}
        render={({ field: { value } }) => (
          <>
            <div className="flex items-center">
              <UserInfo size="sm" fallbackValue={value} />
            </div>
            <button
              type="button"
              onClick={remove}
              className="ml-6 bg-white rounded-md text-sm font-medium text-cyan-600 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              {t('actions.delete')}
            </button>
          </>
        )}
      />
    </li>
  );
}
