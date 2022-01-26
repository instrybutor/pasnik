import { PropsWithChildren } from 'react';

export function PanelFooter({ children }: PropsWithChildren<unknown>) {
  return <div className="px-4 py-4 sm:px-6">{children}</div>;
}
