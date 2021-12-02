import { t } from 'i18next';
import React from 'react';
import { NavLink } from 'react-router-dom';

export interface DashboardOverviewCardProps {
  name: string;
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  amount: string;
  href: string;
}

export function DashboardOverviewCard({
  name,
  Icon,
  amount,
  href,
}: DashboardOverviewCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {name}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {amount}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <NavLink
            to={href}
            className="font-medium text-cyan-700 hover:text-cyan-900"
          >
            {t('dashboard.overview.see_all')}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverviewCard;
