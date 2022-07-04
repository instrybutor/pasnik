import { Price, Users } from '@pasnik/components';
import { ProcessDish } from './order-process-section';
import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { OrderDishes } from '../order-dishes/order-dishes';

export interface OrderDishesProps {
  dishes: ProcessDish[];
}

export function OrderProcess({ dishes }: OrderDishesProps) {
  return (
    <div className="divide-y divide-gray-200">
      {dishes?.map((summary) => (
        <Disclosure key={summary.name}>
          {({ open }) => (
            <>
              <div className="flex py-4 px-6 items-center">
                <Disclosure.Button className="-my-1 -ml-1 mr-1 p-1 text-gray-500 border border-transparent rounded-full text-white hover:bg-gray-200 focus:outline-none">
                  <ChevronDownIcon
                    className={classNames(
                      open ? '-rotate-180' : 'rotate-0',
                      'h-5 w-5 transform'
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <div className="text-sm text-gray-500">
                  {summary.dishes.length} x
                </div>
                <div className="pl-2 text-sm text-gray-500 font-bold flex-1">
                  {summary.name}
                </div>
                <div className="text-sm text-gray-500 flex gap-6 items-center">
                  <Users users={summary.users} avatarSize="xsm" />
                  <Price
                    priceCents={summary.priceCents * summary.dishes.length}
                  />
                </div>
              </div>
              <Disclosure.Panel>
                <OrderDishes dishes={summary.dishes} isAdding={false} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
