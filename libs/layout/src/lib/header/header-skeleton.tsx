import { HeaderProfileDropdownSkeleton } from './header-profile-dropdown-skeleton';

export function HeaderSkeleton() {
  return (
    <div className="animate-pulse items-center relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
      <div className="px-4 border-r border-gray-200 lg:hidden">
        <div className="w-6 h-6 rounded-full bg-gray-300"></div>
      </div>
      <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="flex-1 flex items-center xsm:justify-end">
          <div className="flex space-x-3 flex-grow xsm:flex-grow-0 md:ml-4">
            <div className="flex-1 h-10 w-40 text-center items-center px-4 py-2 border border-transparent shadow-sm rounded-md bg-gray-300" />
          </div>
        </div>
        <div className="flex items-center ml-3 gap-2">
          <div className="w-6 h-6 mx-1 rounded-full bg-gray-300"></div>
          <HeaderProfileDropdownSkeleton />
        </div>
      </div>
    </div>
  );
}
