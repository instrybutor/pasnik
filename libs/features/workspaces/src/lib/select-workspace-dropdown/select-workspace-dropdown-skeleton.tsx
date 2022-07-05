export function SelectWorkspaceDropdownSkeleton() {
  return (
    <div className="animate-pulse">
      <label className="flex justify-between w-full text-sm font-medium text-white pl-3 pr-2">
        <div className="w-32 h-4 my-0.5 bg-cyan-200 rounded-md"></div>
      </label>
      <div className="mt-1">
        <div className="bg-white relative w-full bg-cyan-800 rounded-md pl-3 pr-3 py-3">
          <div className="w-full h-4 my-0.5 bg-cyan-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
