import { ExclamationIcon } from '@heroicons/react/outline';

export function InvitationPendingAlert() {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Twoje zaproszenie oczekuje na akceptację.
          </h3>
        </div>
      </div>
    </div>
  );
}
