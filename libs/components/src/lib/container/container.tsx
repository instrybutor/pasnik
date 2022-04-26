import { PropsWithChildren } from 'react';
import { ContainerPaddedContent } from './container-padded-content';
import classNames from 'classnames';

export interface ContainerProps {
  padded?: boolean;
}

export function Container({
  children,
  padded,
}: PropsWithChildren<ContainerProps>) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={classNames({ 'max-w-3xl mx-auto': padded })}>
        {children}
      </div>
    </div>
  );
}

Container.PaddedContent = ContainerPaddedContent;
