import { UserAvatar } from '@pasnik/components';

export function HeaderProfileDropdownSkeleton() {
  return (
    <div className="animate-pulse max-w-xs bg-white rounded-full flex items-center text-sm lg:p-2 lg:rounded-md">
      <UserAvatar size="sm" />

      <span className="hidden w-full sm:w-36 ml-3 text-gray-700 text-sm font-medium lg:flex">
        <div className="skeleton w-full" />
      </span>
    </div>
  );
}
