import classNames from 'classnames';

export function OrderDishesSkeleton() {
  const sizes: Record<number, string> = {
    1: 'w-36',
    2: 'w-28',
    3: 'w-72',
  };
  return (
    <div className="divide-y divide-gray-200 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex items-center gap-6 px-6 py-4 animate-pulse"
        >
          <div className="flex items-center">
            <div className="flex relative">
              <div className="h-8 w-8 rounded-full bg-gray-300 rounded-md" />
            </div>
          </div>

          <div className="flex-1 w-full">
            <div
              className={classNames('h-5 bg-gray-300 rounded-md', sizes[item])}
            />
          </div>

          <div className="h-5 w-20 bg-gray-300 text-right rounded-md" />

          <div className="hidden empty:hidden whitespace-nowrap space-x-2 flex-shrink-0 items-center sm:flex flex-row">
            <div className="h-8 w-8 rounded-full bg-gray-300" />
            <div className="h-8 w-8 rounded-full bg-gray-300" />
            <div className="h-8 w-8 rounded-full bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
