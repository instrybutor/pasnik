import classNames from 'classnames';

export function OrderProcessSkeleton() {
  const sizes: Record<number, string> = {
    1: 'w-36',
    2: 'w-28',
    3: 'w-72',
  };
  return (
    <div className="divide-y divide-gray-200">
      {[1, 2, 3]?.map((item) => (
        <div className="flex py-4 px-6 items-center">
          <div className="-my-2 -ml-1 mr-1 p-1 text-gray-500 border border-transparent rounded-full text-white">
            <div className="h-8 w-8 rounded-full bg-gray-300" />
          </div>
          <div className="h-4 w-6 bg-gray-300 rounded-md"></div>
          <div className="pl-2 text-sm text-gray-500 font-bold flex-1">
            <div
              className={classNames('h-4 bg-gray-300 rounded-md', sizes[item])}
            ></div>
          </div>
          <div className="text-sm text-gray-500 flex gap-6 items-center">
            <div className="h-6 w-6 rounded-full bg-gray-300" />
            <div className="h-4 w-12 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
