import { BeakerIcon } from '@heroicons/react/outline';

export function WorkspaceInactiveOrdersEmpty() {
  return (
    <div className="text-center bg-white px-4 py-12">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Brak zakończonych zamówień
      </h3>
    </div>
  );
}
