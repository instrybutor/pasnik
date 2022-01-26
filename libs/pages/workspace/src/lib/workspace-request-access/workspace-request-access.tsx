import { LockClosedIcon } from '@heroicons/react/outline';
import { useWorkspaceRequestAccessMutation } from '@pasnik/features/workspaces';

export interface WorkspaceRequestAccessParams {
  slug: string;
}

export function WorkspaceRequestAccess({ slug }: WorkspaceRequestAccessParams) {
  const { mutateAsync } = useWorkspaceRequestAccessMutation(slug);
  return (
    <main className="my-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="block bg-white shadow-lg rounded-lg px-4 pt-5 pb-4 text-left sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <LockClosedIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Ta przestrzeń jest prywatna
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Możesz poprosić o dostęp wysyłając prośbę o dołączenie.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            onClick={() => {
              mutateAsync();
            }}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Wyślij prośbę
          </button>
        </div>
      </div>
    </main>
  );
}
