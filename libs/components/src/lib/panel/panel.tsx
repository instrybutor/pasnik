import { PropsWithChildren } from 'react';
import { PanelHeader } from './panel-header';
import classNames from 'classnames';
import { PanelFooter } from './panel-footer';
import { PanelContent } from './panel-content';

export interface PanelProps {
  edgeToEdge?: boolean;
}

export function Panel({ children, edgeToEdge }: PropsWithChildren<PanelProps>) {
  return (
    <div
      className={classNames(
        'bg-white overflow-hidden shadow my-4 mm:py-6 lg:my-8 w-full',
        {
          'rounded-lg': !edgeToEdge,
          'sm:rounded-lg': edgeToEdge,
        }
      )}
    >
      {children}
    </div>
  );
}

Panel.Header = PanelHeader;
Panel.Footer = PanelFooter;
Panel.Content = PanelContent;
