/* eslint-disable-next-line */
export interface CreateOrderHeaderProps {}

export function CreateOrderHeader(props: CreateOrderHeaderProps) {
  return (
    <div className="bg-white shadow">
      <div>
        <div className="py-6 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0">
            <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
              Utwórz zamówienie
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrderHeader;
