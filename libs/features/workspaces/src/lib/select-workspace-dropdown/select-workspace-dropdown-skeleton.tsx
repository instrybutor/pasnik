export function SelectWorkspaceDropdownSkeleton() {
  return (
    <div className="animate-pulse">
      <label className="flex justify-between w-full text-sm font-medium text-white pl-3 pr-2">
        <div className="skeleton w-32 bg-cyan-200"></div>
      </label>
      <div className="mt-1">
        <div className="bg-white relative w-full bg-cyan-800 rounded-md pl-3 pr-10 py-3 text-left sm:text-sm">
          <div className="w-full skeleton bg-cyan-200"></div>
        </div>
      </div>
    </div>
  );
}
