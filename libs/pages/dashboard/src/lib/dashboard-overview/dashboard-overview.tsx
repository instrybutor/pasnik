import {
  LoginIcon,
  ScaleIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import DashboardOverviewCard from '../dashboard-overview-card/dashboard-overview-card';

/* eslint-disable-next-line */
export interface DashboardOverviewProps {}

export function DashboardOverview(props: DashboardOverviewProps) {
  return (
    <>
      <h2 className="text-lg leading-6 font-medium text-gray-900">Przegląd</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardOverviewCard
          name="Twoje saldo"
          Icon={ScaleIcon}
          amount="200kzł"
          href="/balances"
        />
        <DashboardOverviewCard
          name="Twoje zamówienia"
          Icon={ShoppingCartIcon}
          amount="33"
          href="/history"
        />
        <DashboardOverviewCard
          name="Oczekujące transfery"
          Icon={LoginIcon}
          amount="455zł"
          href="/history"
        />
      </div>
    </>
  );
}

export default DashboardOverview;
