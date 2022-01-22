import { Trans, useTranslation } from 'react-i18next';
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
import { OrderAction, OrderActionModel } from '@pasnik/api/data-transfer';
import { DateFormat, UserName } from '@pasnik/components';

const typesMap = {
  [OrderAction.Created]: {
    icon: PlusIcon,
    bgColorClass: 'bg-gray-400',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>timeline.createdBy</Trans>{' '}
        <UserName user={user} initials={true} />
      </>
    ),
  },
  [OrderAction.Cancel]: {
    icon: XIcon,
    bgColorClass: 'bg-red-500',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>timeline.canceledBy</Trans>{' '}
        <UserName user={user} initials={true} />
      </>
    ),
  },
  [OrderAction.Paid]: {
    icon: CashIcon,
    bgColorClass: 'bg-yellow-500',
    text: ({ actionUser }: OrderActionModel) => (
      <>
        <Trans>timeline.payedBy</Trans>{' '}
        <UserName user={actionUser!} initials={true} />
      </>
    ),
  },
  [OrderAction.Delivered]: {
    icon: CheckIcon,
    bgColorClass: 'bg-green-500',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>timeline.deliveredBy</Trans>{' '}
        <UserName user={user} initials={true} />
      </>
    ),
  },
  [OrderAction.Open]: {
    icon: LockOpenIcon,
    bgColorClass: 'bg-green-500',
    text: ({ user }: OrderActionModel) => (
      <>
        Otwarte przez <UserName user={user} initials={true} />
      </>
    ),
  },
  [OrderAction.Ordered]: {
    icon: LockClosedIcon,
    bgColorClass: 'bg-red-500',
    text: ({ user }: OrderActionModel) => (
      <>
        <Trans>timeline.orderedBy</Trans>{' '}
        <UserName user={user} initials={true} />
      </>
    ),
  },
};

export interface OrderTimelineProps {
  actions?: OrderActionModel[] | null;
}

export function OrderTimeline({ actions }: OrderTimelineProps) {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-start-3 lg:col-span-1"
    >
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          {t('timeline.title')}
        </h2>

        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {actions?.map((item, itemIdx) => {
              const ActionIcon = typesMap[item.action]?.icon;
              const message = typesMap[item.action]?.text(item) ?? item.action;

              return (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {itemIdx !== actions.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
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
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div className="text-sm text-gray-500">{message}</div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <DateFormat
                            date={item.createdAt}
                            format="dd LLL, HH:mm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default OrderTimeline;
