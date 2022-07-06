export function LoginSectionSkeleton() {
  return (
    <div className="animate-pulse flex flex-col py-16 gap-8">
      <h1 className="text-4xl flex flex-col items-center gap-1">
        <div className="flex flex-row items-center gap-1">
          🍔 <div className="h-8 w-28 rounded-md bg-gray-300" />
        </div>
        <div className="h-4 w-52 rounded-md bg-gray-300"></div>
      </h1>

      <div className="border-b border-b-gray-100 w-full" />
      <span className="mx-auto">
        <div className="h-6 w-64 rounded-md bg-gray-300"></div>
      </span>

      <div className="flex justify-center flex-col items-center gap-6">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="items-center border-gray-300 border w-64 justify-center h-12 inline-flex rounded-md px-4"
          >
            <div className="h-6 w-6 mr-4 rounded-md bg-gray-300"></div>
            <div className="h-6 flex-1 rounded-md bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
