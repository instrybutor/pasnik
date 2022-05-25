import { ReactElement } from 'react';
import classNames from 'classnames';

export interface HeaderProps {
  left: ReactElement;
  right?: ReactElement;
  className?: string;
}

export function Header({ left, right, className }: HeaderProps) {
  return (
    <header className={classNames(className, 'py-8')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
        <div className="flex-1 min-w-0">{left}</div>
        {right && <div className="mt-5 flex lg:mt-0 lg:ml-4">{right}</div>}
      </div>
    </header>
  );
}
