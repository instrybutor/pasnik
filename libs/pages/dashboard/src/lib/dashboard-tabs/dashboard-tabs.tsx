import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import classnames from 'classnames';

export interface DashboardTabsProps {
  tabs: { name: string; count: number }[];
}

export function DashboardTabs({ tabs }: DashboardTabsProps) {
  return (
    <Tab.List>
      {tabs.map((tab) => (
        <Tab key={tab.name} as={Fragment}>
          {({ selected }) => (
            <button
              key={tab.name}
              className={classnames(
                selected
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                'whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm'
              )}
            >
              {tab.name}
              {tab.count ? (
                <span
                  className={classnames(
                    selected
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-gray-100 text-gray-900',
                    'hidden ml-2 px-2 rounded-full text-xs font-medium md:inline-block'
                  )}
                >
                  {tab.count}
                </span>
              ) : null}
            </button>
          )}
        </Tab>
      ))}
    </Tab.List>
  );
}

export default DashboardTabs;
