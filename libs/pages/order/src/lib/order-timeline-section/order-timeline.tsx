import { Trans } from 'react-i18next';
import classNames from 'classnames';
import {
  CashIcon,
  CheckIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  OrderAction,
  OrderActionModel,
  OrderModel,
} from '@pasnik/api/data-transfer';
import { DateFormat, UserAvatar } from '@pasnik/components';
import { useMemo } from 'react';

const sortHistory = (actionA: OrderActionModel, actionB: OrderActionModel) =>
  new Date(actionB.createdAt).getTime() > new Date(actionA.createdAt).getTime()
    ? -1
    : 1;

const typesMap = {
  [OrderAction.Created]: {
    icon: PlusIcon,
    bgColorClass: 'bg-gray-400',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>order.timeline.created</Trans> <Trans>order.timeline.by</Trans>{' '}
        <UserAvatar showTooltip={true} size="xsm" user={user} />
      </>
    ),
  },
  [OrderAction.Cancel]: {
    icon: XIcon,
    bgColorClass: 'bg-red-500',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>order.timeline.canceled</Trans> <Trans>order.timeline.by</Trans>{' '}
        <UserAvatar showTooltip={true} size="xsm" user={user} />
      </>
    ),
  },
  [OrderAction.Paid]: {
    icon: CashIcon,
    bgColorClass: 'bg-yellow-500',
    text: ({ actionUser }: OrderActionModel) => (
      <>
        <Trans>order.timeline.paid</Trans> <Trans>order.timeline.by</Trans>{' '}
        <UserAvatar showTooltip={true} size="xsm" user={actionUser} />
      </>
    ),
  },
  [OrderAction.Delivered]: {
    icon: CheckIcon,
    bgColorClass: 'bg-green-500',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>order.timeline.delivered</Trans> <Trans>order.timeline.by</Trans>{' '}
        <UserAvatar showTooltip={true} size="xsm" user={user} />
      </>
    ),
  },
  [OrderAction.Open]: {
    icon: LockOpenIcon,
    bgColorClass: 'bg-green-500',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>order.timeline.opened</Trans> <Trans>order.timeline.by</Trans>{' '}
        <UserAvatar showTooltip={true} size="xsm" user={user} />
      </>
    ),
  },
  [OrderAction.Ordered]: {
    icon: LockClosedIcon,
    bgColorClass: 'bg-red-500',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>order.timeline.ordered</Trans> <Trans>order.timeline.by</Trans>{' '}
        <UserAvatar showTooltip={true} size="xsm" user={user} />
      </>
    ),
  },
  [OrderAction.Processing]: {
    icon: LockClosedIcon,
    bgColorClass: 'bg-yellow-500',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>order.timeline.processing</Trans>{' '}
        <Trans>order.timeline.by</Trans>{' '}
        <UserAvatar showTooltip={true} size="xsm" user={user} />
      </>
    ),
  },
};

export interface OrderTimelineProps {
  isDetailed: boolean;
  order: OrderModel;
}

export function OrderTimeline({ isDetailed, order }: OrderTimelineProps) {
  const filteredActions = useMemo(() => {
    return (() => {
      if (isDetailed) {
        return order?.actions ?? [];
      }
      const acts = new Map<OrderAction, OrderActionModel>();
      order?.actions?.forEach((acc) => {
        acts.delete(acc.action);
        acts.set(acc.action, acc);
      });
      return Array.from(acts.values());
    })().sort(sortHistory);
  }, [order?.actions, isDetailed]);

  return (
    <ul className="-mb-8">
      {filteredActions.map((item, itemIdx, arr) => {
        const ActionIcon = typesMap[item.action]?.icon;
        const message = typesMap[item.action]?.text(item) ?? item.action;

        return (
          <li key={item.id}>
            <div className="relative pb-8">
              {itemIdx !== arr.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3 items-center">
                <div>
                  <span
                    className={classNames(
                      typesMap[item.action]?.bgColorClass ??
                        'bg-black text-white',
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    {typesMap[item.action] ? (
                      <ActionIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <QuestionMarkCircleIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
                <div className="min-w-0 flex-1 flex justify-between space-x-4 items-center">
                  <div className="text-sm text-gray-500 flex items-center gap-1 pt-0.5">
                    {message}
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <DateFormat date={item.createdAt} format="dd LLL, HH:mm" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default OrderTimeline;
