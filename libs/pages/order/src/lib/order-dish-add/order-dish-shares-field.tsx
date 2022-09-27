import {
  ExpenseModel,
  ShareType,
  WorkspaceModel,
} from '@pasnik/api/data-transfer';
import { Label, ModalButton, UserAvatar, UserInfo } from '@pasnik/components';
import { DishSharesModal } from '../order-shares/dish-shares-modal';
import { Controller, useFormContext } from 'react-hook-form';
import {
  useWorkspaceUser,
  useWorkspaceUsersEntities,
} from '@pasnik/features/workspaces';
import { useTranslation } from 'react-i18next';
import { useCurrentUser } from '@pasnik/auth';

export interface OrderDishSharesField {
  dish?: ExpenseModel;
  workspace: WorkspaceModel;
}

export function OrderDishSharesField({
  dish,
  workspace,
}: OrderDishSharesField) {
  const { getValues } = useFormContext();
  const { t } = useTranslation();
  const entities = useWorkspaceUsersEntities(workspace.slug);
  const { data: currentUser } = useCurrentUser();
  const currentWorkspaceUser = useWorkspaceUser(workspace.slug, currentUser);
  return (
    <Controller
      name="shares"
      defaultValue={
        dish
          ? dish.shares
          : [
              {
                workspaceUserId: currentWorkspaceUser?.id,
                shareType: ShareType.Coefficient,
                share: 1,
              },
            ]
      }
      render={({ field: { value, onChange } }) => (
        <ModalButton
          modal={
            <DishSharesModal
              workspace={workspace}
              expense={dish ?? { priceCents: getValues()['priceCents'] }}
              shares={value}
            />
          }
          onClose={(shares) => shares && onChange(shares)}
          rounded="full"
          color="primary"
          className="relative p-0 flex-shrink-0 text-xs leading-5 font-bold bg-gray-200 hover:bg-gray-200 h-8 w-8 max-w-none"
        >
          <>
            <span className="xsm:flex flex-1 hidden justify-center items-center">
              {(value ?? []).length > 1 ? (
                <span className="text-gray-500">+ {value.length}</span>
              ) : (
                <UserAvatar
                  size="sm"
                  user={entities?.[value[0]?.workspaceUserId]?.user}
                />
              )}
            </span>
            <span className="xsm:hidden flex flex-col gap-1">
              <Label className="text-left block text-gray-500">
                {t('order.form.user_name')}
              </Label>
              <UserInfo size="sm" />
            </span>
          </>
        </ModalButton>
      )}
    />
  );
}
