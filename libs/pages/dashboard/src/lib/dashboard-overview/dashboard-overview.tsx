import {
  LoginIcon,
  ScaleIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import { t } from 'i18next';
import DashboardOverviewCard from '../dashboard-overview-card/dashboard-overview-card';

export function DashboardOverview() {
  return (
    <>
      <h2 className="text-lg leading-6 font-medium text-gray-900">
        {t('dashboard.overview.title')}
      </h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardOverviewCard
          name={t('dashboard.overview.balance')}
          Icon={ScaleIcon}
          amount="0 zł"
          href="/balances"
        />
        <DashboardOverviewCard
          name={t('dashboard.overview.orders')}
          Icon={ShoppingCartIcon}
          amount="0"
          href="/history"
        />
        <DashboardOverviewCard
          name={t('dashboard.overview.transfers')}
          Icon={LoginIcon}
          amount="0 zł"
          href="/transfers"
        />
      </div>
    </>
  );
}

export default DashboardOverview;
