import './dashboard-tab-button.module.scss';
import classnames from 'classnames';

/* eslint-disable-next-line */
export interface DashboardTabButtonProps {
  selected: boolean;
  name: string;
  count: number;
}

export function DashboardTabButton({
  selected,
  name,
  count,
}: DashboardTabButtonProps) {
  return (
    <button
      key={name}
      className={classnames(
        selected
          ? 'border-purple-500 text-purple-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
        'whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm'
      )}
    >
      {name}
      {count ? (
        <span
          className={classnames(
            selected
              ? 'bg-purple-100 text-purple-600'
              : 'bg-gray-100 text-gray-900',
            'hidden ml-2 px-2 rounded-full text-xs font-medium md:inline-block'
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

export default DashboardTabButton;
