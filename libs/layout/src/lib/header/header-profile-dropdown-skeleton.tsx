import { UserAvatar } from '@pasnik/components';

export function HeaderProfileDropdownSkeleton() {
  return (
    <div className="animate-pulse max-w-xs bg-white rounded-full flex items-center text-sm lg:p-2 lg:rounded-md">
      <UserAvatar size="sm" />

      <span className="hidden sm:w-36 ml-3 text-gray-700 text-sm font-medium lg:flex">
        <div className="h-4 bg-gray-300 w-full rounded-md" />
      </span>
    </div>
  );
}
