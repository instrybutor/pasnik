import { PropsWithChildren, Suspense } from 'react';
import { Trans } from 'react-i18next';

export interface TransSkeletonProps {
  className: string;
}

export function TransSkeleton({
  className,
  children,
}: PropsWithChildren<TransSkeletonProps>) {
  return (
    <Suspense fallback={<div className={className} />}>
      <Trans>{children}</Trans>
    </Suspense>
  );
}
