import './dashboard-header.module.scss';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

/* eslint-disable-next-line */
export interface DashboardHeaderProps {}

export function DashboardHeader(props: DashboardHeaderProps) {
  const history = useHistory();

  const createOrderHandler = useCallback(() => {
    history.push('/create-order');
  }, [history]);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Dashboard
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <button
          onClick={createOrderHandler}
          type="button"
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Utwórz zamówienie
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
