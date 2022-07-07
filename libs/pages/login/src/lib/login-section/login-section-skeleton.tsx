export function LoginSectionSkeleton() {
  return (
    <div className="animate-pulse flex flex-col py-16 gap-8">
      <h1 className="text-4xl text-center font-semibold flex flex-col items-center">
        <span role="img" aria-label="food">
          🍔 Paśnik
        </span>
        <div className="text-xs text-gray-400 skeleton w-52" />
      </h1>

      <div className="border-b border-b-gray-100 w-full" />
      <div className="mx-auto skeleton w-64" />

      <div className="flex justify-center flex-col items-center gap-6">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="items-center border-gray-300 border w-64 justify-center h-12 inline-flex rounded-md px-4"
          >
            <div className="skeleton w-6 mr-4"></div>
            <div className="skeleton flex-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
