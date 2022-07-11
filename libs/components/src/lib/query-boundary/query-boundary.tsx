import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import { PropsWithChildren, ReactElement, Suspense } from 'react';

export interface QueryBoundaryProps {
  fallback: ReactElement;
}

export function QueryBoundary({
  children,
  fallback,
}: PropsWithChildren<QueryBoundaryProps>) {
  return (
    <Suspense fallback={fallback}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={() => fallback}>
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
}
