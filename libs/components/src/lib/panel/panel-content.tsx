import { PropsWithChildren } from 'react';

export function PanelContent({ children }: PropsWithChildren<unknown>) {
  return <div className="px-4 py-5 sm:p-6">{children}</div>;
}
