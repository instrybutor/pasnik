import classNames from 'classnames';

export function OrderSummarySkeleton() {
  const sizes: Record<number, string> = {
    1: 'w-36',
    2: 'w-28',
    3: 'w-72',
  };
  return (
    <div className="divide-y divide-gray-200">
      {[1, 2, 3].map((item) => (
        <div key={item} className="py-5 px-3 sm:px-6">
          <div className="flex flex-1 flex-row">
            <div className="flex flex-1 items-center">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-300 rounded-full" />
                <div className="ml-3 overflow-hidden gap-2 flex flex-col">
                  <div
                    className={classNames(
                      'h-4 bg-gray-300 rounded-md',
                      sizes[item]
                    )}
                  />
                  <div className="h-3 w-4 bg-gray-300 rounded-md" />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="-my-2 -ml-1 mr-1 p-1 text-gray-500 border border-transparent rounded-full text-white">
                <div className="h-8 w-8 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
