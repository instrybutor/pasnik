import { RefreshIcon } from '@heroicons/react/outline';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import { FunctionComponent, PropsWithChildren, Suspense } from 'react';
import Spinner from '../spinner/spinner';

export interface QueryBoundaryProps {
  errorElement?: FunctionComponent<FallbackProps>;
}

function DefaultErrorElement({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="text-center bg-white px-4 py-12">
      <button
        onClick={resetErrorBoundary}
        type="button"
        className="mx-auto text-red-300 bg-white p-1 rounded-full hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      >
        <RefreshIcon className="h-12 w-12" aria-hidden="true" />
      </button>
      <h3 className="mt-2 text-sm font-medium text-gray-900">Wystąpił błąd</h3>
    </div>
  );
}

export function QueryBoundary({
  children,
  errorElement,
}: PropsWithChildren<QueryBoundaryProps>) {
  const fallbackRender = errorElement ?? DefaultErrorElement;
  return (
    <Suspense fallback={<Spinner />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
}
