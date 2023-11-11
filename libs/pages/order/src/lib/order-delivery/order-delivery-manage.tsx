import { useTranslation } from 'react-i18next';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import {
  Button,
  CurrencyInput,
  currencyTransform,
  Form,
  FormField,
  FormSpinner,
  Popover,
  UserAvatar,
} from '@pasnik/components';
import {
  AddDishDto,
  ExpenseModel,
  OrderModel,
} from '@pasnik/api/data-transfer';
import {
  useCurrentWorkspace,
  useWorkspaceUsers,
  useWorkspaceUsersEntities,
} from '@pasnik/features/workspaces';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useOrderDelivery } from './order-delivery.hook';
import { OrderSharesReadonly } from '../order-shares/order-shares-readonly';
import { useCurrentUser } from '@pasnik/auth';

export interface OrderDishAddProps {
  onClose: () => void;
  order: OrderModel;
  dishes: ExpenseModel[];
}

export function OrderDeliveryManage({
  onClose,
  order,
  dishes,
}: OrderDishAddProps) {
  const { t } = useTranslation();
  const { data: workspace } = useCurrentWorkspace();
  const { data: workspaceUsers } = useWorkspaceUsers(workspace?.slug);
  const entities = useWorkspaceUsersEntities(workspace?.slug);
  const { data: currentUser } = useCurrentUser();

  const { shares } = useOrderDelivery(order, dishes);

  return (
    <Form<AddDishDto>
      resolver={classValidatorResolver(AddDishDto)}
      onSubmit={async (formData) => {
        onClose();
      }}
      className="flex flex-col items-stretch py-3 pl-6 pr-6 gap-3 xsm:flex-row mt-[1px] mb-[1px]"
    >
      <FormSpinner size="sm" />
      <div className="flex items-center flex-shrink-0">
        <div className="flex items-center">
          <div className="flex relative items-center justify-center">
            {(shares ?? []).length > 1 ? (
              <Popover
                panel={() => (
                  <OrderSharesReadonly
                    users={workspaceUsers ?? []}
                    shares={shares ?? []}
                    totalPriceCents={order!.shippingCents ?? 0}
                  />
                )}
                className="relative ring-2 ring-offset-2 ring-gray-200 flex-shrink-0 text-xs leading-5 focus:ring-cyan-500 font-bold rounded-full bg-gray-200 h-8 w-8 max-w-none outline-none"
              >
                <UserAvatar showTooltip={true} user={currentUser} size="sm" />
                <span className="flex justify-center absolute inset-0">
                  <span className="text-gray-500">+ {shares?.length}</span>
                </span>
              </Popover>
            ) : (
              <UserAvatar
                showTooltip={true}
                user={entities[shares?.[0]?.workspaceUserId ?? -1]?.user}
                size="sm"
              />
            )}
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 w-full">{t('order.delivery')}</div>
      <div className="flex items-center gap-4 xsm:flex-row flex-col">
        <div className="text-sm text-gray-500 w-full xsm:w-32">
          <FormField
            label={t('order.form.price')}
            labelClassName="xsm:hidden block"
            defaultValue={order.shippingCents}
            name="priceCents"
            errorTooltip={true}
            suffix="zł"
            transform={currencyTransform}
          >
            <CurrencyInput
              type="text"
              inputMode="numeric"
              placeholder="0.00"
              className="text-right"
            />
          </FormField>
        </div>

        <div className="text-right text-sm font-medium space-x-2 flex-shrink-0 ml-9">
          <Button className="flex-1" type="submit" rounded="full">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Button
            onClick={onClose}
            color="warn"
            className="flex-1"
            rounded="full"
          >
            <XIcon className="h-5 w-5 pointer-events-none" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Form>
  );
}
