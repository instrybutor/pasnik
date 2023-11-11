import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';
import { DotsHorizontalIcon, DuplicateIcon } from '@heroicons/react/outline';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { ExpenseModel } from '@pasnik/api/data-transfer';
import {
  Button,
  ConfirmButton,
  Popover,
  Price,
  UserAvatar,
  UserName,
} from '@pasnik/components';
import { Can, OrdersAction } from '@pasnik/ability';
import { Float } from '@headlessui-float/react';
import { useOrderDish } from './order-dish.hook';
import { useCurrentOrder } from '@pasnik/features/orders';
import {
  useCurrentWorkspace,
  useWorkspaceUsers,
} from '@pasnik/features/workspaces';
import { useMemo } from 'react';
import { OrderSharesReadonly } from '../order-shares/order-shares-readonly';

export interface OrderDishProps {
  expense: ExpenseModel;
  onUpdate: () => void;
}
export function OrderDish({ expense, onUpdate }: OrderDishProps) {
  const { t } = useTranslation();
  const { order } = useCurrentOrder();
  const { onDuplicate, onDelete } = useOrderDish(expense);
  const { data: workspace } = useCurrentWorkspace();
  const { data: workspaceUsers } = useWorkspaceUsers(workspace?.slug);
  const workspaceUser = useMemo(
    () =>
      (expense.shares.map(({ workspaceUserId }) =>
        workspaceUsers?.find(({ id }) => workspaceUserId === id)
      ) ?? [])[0],
    [workspaceUsers, expense.shares]
  );

  const owner = useMemo(
    () => workspaceUsers?.find(({ id }) => id === expense.workspaceUserId),
    [workspaceUsers, expense.workspaceUserId]
  );

  return (
    <div className="flex items-center gap-6 px-6 py-4">
      <div className="flex items-center">
        <div className="flex relative items-center justify-center">
          {(expense.shares ?? []).length > 0 ? (
            <Popover
              panel={() => (
                <OrderSharesReadonly
                  users={workspaceUsers ?? []}
                  shares={expense.shares ?? []}
                  totalPriceCents={expense.priceCents ?? 0}
                />
              )}
              className={
                'relative overflow-hidden bg-gray-200 text-gray-500 ring-2 ring-offset-2 ring-gray-200 flex-shrink-0 text-xs leading-5 focus:ring-cyan-500 font-bold rounded-full h-8 w-8 max-w-none outline-none flex items-center justify-center'
              }
            >
              <span className="flex justify-center">
                {(expense.shares ?? []).length > 1 ? (
                  <span className="text-gray-500">
                    + {expense.shares.length}
                  </span>
                ) : (
                  <UserAvatar size="sm" user={workspaceUser?.user} />
                )}
              </span>
            </Popover>
          ) : (
            <span className="relative overflow-hidden bg-gray-200 text-gray-500 ring-2 ring-offset-2 ring-gray-200 flex-shrink-0 text-xs leading-5 focus:ring-cyan-500 font-bold rounded-full h-8 w-8 max-w-none outline-none flex items-center justify-center">
              <UserAvatar
                showTooltip={true}
                user={workspaceUser?.user}
                size="sm"
              />
            </span>
          )}
          {expense.workspaceUserId !== workspaceUser?.id &&
            (expense.shares ?? []).length === 1 && (
              <UserAvatar
                showTooltip={(user) => (
                  <span className="flex flex-col text-center">
                    {t('order.added_by')} <br />
                    <UserName user={user} />
                  </span>
                )}
                className="absolute right-0 bottom-0"
                user={owner?.user}
                size="xxsm"
              />
            )}
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="text-sm text-gray-500 min-w-0 flex-1">
          {expense.name}
        </div>
      </div>

      <div className="flex-0 text-sm text-gray-500 w-20 text-right">
        <Price priceCents={expense.priceCents} />
      </div>

      <div className="hidden sm:block empty:hidden whitespace-nowrap space-x-2 flex-shrink-0">
        <Can I={OrdersAction.CreateDish} this={order}>
          <Button
            onClick={onDuplicate}
            type="button"
            rounded="full"
            className="p-1"
          >
            <DuplicateIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </Can>
        <Can I={OrdersAction.UpdateDish} this={order}>
          <Button
            onClick={onUpdate}
            type="button"
            rounded="full"
            className="p-1"
          >
            <PencilIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </Can>
        <Can I={OrdersAction.DeleteDish} this={order}>
          <ConfirmButton
            onClick={onDelete}
            type="button"
            color="warn"
            rounded="full"
            className="p-1"
          >
            <TrashIcon
              className="h-5 w-5 pointer-events-none"
              aria-hidden="true"
            />
          </ConfirmButton>
        </Can>
      </div>
      <Menu as="span" className="ml-3 relative sm:hidden">
        <Float
          placement="bottom"
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          portal
        >
          <Menu.Button className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
            <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
              >
                <DuplicateIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                {t('order.actions.duplicate')}
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={onUpdate}
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
              >
                <PencilIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                {t('order.actions.edit')}
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                type="button"
                className="w-full inline-flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                {t('order.actions.delete')}
              </button>
            </Menu.Item>
          </Menu.Items>
        </Float>
      </Menu>
    </div>
  );
}

export default OrderDish;
