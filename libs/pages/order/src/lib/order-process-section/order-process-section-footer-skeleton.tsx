export function OrderProcessSectionFooterSkeleton() {
  return (
    <div className="px-4 py-5 sm:px-6 flex items-center space-between">
      <span className="flex-1">
        <div className="h-4 w-24 bg-gray-300" />
      </span>
      <span className="flex flex-col flex-shrink-0 gap-5 items-end">
        <div className="flex w-full">
          <div className="flex-1">
            <div className="h-5 w-12 bg-gray-300" />
          </div>
          <div className="mr-3 gap-3 flex">
            <div className="h-5 w-24 bg-gray-300" />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex-1">
            <div className="h-5 w-12 bg-gray-300" />
          </div>
          <div className="mr-3 gap-3 flex">
            <div className="h-5 w-24 bg-gray-300" />
          </div>
        </div>
      </span>
    </div>
  );
}
