import { BeakerIcon } from '@heroicons/react/outline';

/* eslint-disable-next-line */
export interface DashboardOrdersEmptyProps {}

export function DashboardOrdersEmpty(props: DashboardOrdersEmptyProps) {
  return (
    <div className="text-center bg-white px-4 py-12">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Brak aktywnych zamówień
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Zacznij od utworzenia nowego zamówienia
      </p>
    </div>
  );
}

export default DashboardOrdersEmpty;
