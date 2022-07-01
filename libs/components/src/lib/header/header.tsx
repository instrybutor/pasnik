import { ReactElement } from 'react';
import classNames from 'classnames';

export interface HeaderProps {
  left: ReactElement;
  right?: ReactElement;
  className?: string;
}

export function Header({ left, right, className }: HeaderProps) {
  return (
    <header className={classNames(className, '')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8 xl:flex xl:items-center xl:justify-between py-8 lg:border-t lg:border-gray-200">
        <div className="flex-1 min-w-0">{left}</div>
        {right && <div className="mt-5 flex xl:mt-0 xl:ml-4">{right}</div>}
      </div>
    </header>
  );
}
