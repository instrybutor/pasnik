import { CallState, getError, LoadingState } from '@pasnik/shared/utils';
import { ExclamationIcon } from '@heroicons/react/outline';

export interface CallStateWrapperProps {
  callState: CallState;
  children: JSX.Element;
}

export function CallStateWrapper({
  callState,
  children,
}: CallStateWrapperProps) {
  const error = getError(callState);
  if (error) {
    return (
      <div className="text-center bg-white px-4 py-12">
        <ExclamationIcon className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">{error}</h3>
      </div>
    );
  } else if (callState === LoadingState.LOADED) {
    return children;
  }

  return (
    <div className="px-4 py-14 flex flex-col gap-2 items-center justify-center">
      <span role="img" aria-label="food" className="text-6xl animate-bounce">
        🍔
      </span>
    </div>
  );
}
