import classNames from 'classnames';

export function OrderTimelineSkeleton() {
  const sizes: Record<number, string> = {
    1: 'w-28',
    2: 'w-24',
    3: 'w-36',
  };
  return (
    <ul className="-mb-8 animate-pulse">
      {[1, 2, 3].map((item, itemIdx, arr) => {
        return (
          <li key={item}>
            <div className="relative pb-8">
              {itemIdx !== arr.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3 items-center">
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-300">
                    <div className="w-5 h-5 bg-gray-300" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 flex justify-between space-x-4 items-center">
                  <div className="text-sm text-gray-500 flex items-center gap-1 pt-0.5">
                    <div
                      className={classNames('h-4 bg-gray-300', sizes[item])}
                    />
                    <div className="h-6 w-6 rounded-full bg-gray-300" />
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <div className="h-4 w-12 bg-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
