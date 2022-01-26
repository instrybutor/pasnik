import { PropsWithChildren } from 'react';

export function PanelHeader({ children }: PropsWithChildren<unknown>) {
  return <div className="px-4 py-5 sm:px-6">{children}</div>;
}
