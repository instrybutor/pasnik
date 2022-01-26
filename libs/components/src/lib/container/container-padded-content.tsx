import { PropsWithChildren } from 'react';

export function ContainerPaddedContent({
  children,
}: PropsWithChildren<unknown>) {
  return <div className="max-w-3xl mx-auto">{children}</div>;
}
