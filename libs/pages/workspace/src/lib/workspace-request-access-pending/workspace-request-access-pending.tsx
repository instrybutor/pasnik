import { ClockIcon } from '@heroicons/react/outline';

export function WorkspaceRequestAccessPending() {
  return (
    <main className="my-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="block bg-white shadow-lg rounded-lg px-4 pt-5 pb-4 text-left sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
            <ClockIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Twoja prośba została wysłana
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Po zatwierdzeniu przez administratora zostaniesz poinformowany.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Przekieruj na stronę główną
          </button>
        </div>
      </div>
    </main>
  );
}
