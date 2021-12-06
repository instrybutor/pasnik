import { Link } from 'react-router-dom';
import { BeakerIcon } from '@heroicons/react/outline';

export function OrdersEmpty() {
  return (
    <div className="text-center bg-white px-4 py-12 flex flex-col items-center">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Brak aktywnych zamówień
        </h3>
        <span className="mt-1 text-sm text-gray-500">
          Zacznij od utworzenia nowego zamówienia
        </span>
      </div>

      <Link
        to="/create-order"
        className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 text-sm rounded px-10 mt-4"
      >
        Utwórz zamówienie
      </Link>
    </div>
  );
}

export default OrdersEmpty;
