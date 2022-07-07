import {
  ClockIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/outline';
import { SelectWorkspaceDropdownSkeleton } from '@pasnik/features/workspaces';
import { SidebarItemSkeleton } from '../components/sidebar-item/sidebar-item-skeleton';

export function SidebarSkeleton() {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-5 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 h-8 text-center">
            <h1 className="text-4xl text-cyan-100 flex flex-row gap-1">
              <span role="img" aria-label="food">
                🍔
              </span>{' '}
              <div className="skeleton animate-pulse w-32 bg-cyan-200" />
            </h1>
          </div>
          <nav
            className="flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto mt-5"
            aria-label="Sidebar"
          >
            <div className="px-2">
              <SelectWorkspaceDropdownSkeleton />
            </div>
            <div className="px-2 space-y-1 mt-6 pt-6">
              <SidebarItemSkeleton className="w-24" icon={HomeIcon} />
              <SidebarItemSkeleton className="w-28" icon={OfficeBuildingIcon} />
              <SidebarItemSkeleton className="w-36" icon={ClockIcon} />
            </div>
          </nav>
          <div className="mt-6 pt-6 text-center border-t border-cyan-800">
            <div className="w-36 mx-auto skeleton bg-cyan-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
