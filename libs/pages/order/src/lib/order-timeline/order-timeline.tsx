import classNames from 'classnames';
import {
  CashIcon,
  CheckIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import { OrderModel } from '@pasnik/api/data-transfer';

const eventTypes = {
  created: { icon: PlusIcon, bgColorClass: 'bg-gray-400' },
  opened: { icon: LockOpenIcon, bgColorClass: 'bg-green-400' },
  closed: { icon: LockClosedIcon, bgColorClass: 'bg-red-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
  paid: { icon: CashIcon, bgColorClass: 'bg-yellow-500' },
};

const timeline = [
  {
    id: 1,
    type: eventTypes.created,
    content: 'Zamówienie utworzone przez',
    target: 'PK',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.closed,
    content: 'Zamówienie złożone przez',
    target: 'Mr Szkatuł',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 5,
    type: eventTypes.opened,
    content: 'Zamówienie otwarte przez',
    target: 'Mr Szkatuł',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 6,
    type: eventTypes.closed,
    content: 'Zamówienie złożone przez',
    target: 'PK',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.paid,
    content: 'Zamówienie opłacone przez',
    target: 'MJ',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: eventTypes.completed,
    content: 'Zamówienie odebrane przez',
    target: 'PK',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
];

/* eslint-disable-next-line */
export interface OrderTimelineProps {
  order: OrderModel;
}

export function OrderTimeline(props: OrderTimelineProps) {
  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-start-3 lg:col-span-1"
    >
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          Timeline
        </h2>

        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {timeline.map((item, itemIdx) => (
              <li key={item.id}>
                <div className="relative pb-8">
                  {itemIdx !== timeline.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={classNames(
                          item.type.bgColorClass,
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                        )}
                      >
                        <item.type.icon
                          className="w-5 h-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {item.content}{' '}
                          <a className="font-medium text-gray-900">
                            {item.target}
                          </a>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={item.datetime}>{item.date}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default OrderTimeline;
