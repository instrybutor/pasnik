import { SVGProps } from 'react';
import classNames from 'classnames';

export interface SidebarItemSkeletonProps {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  className?: string;
}

export function SidebarItemSkeleton({
  icon: Icon,
  className,
}: SidebarItemSkeletonProps) {
  return (
    <div className="animate-pulse flex items-center px-2 py-2 rounded-md">
      <Icon
        className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
        aria-hidden="true"
      />
      <div
        className={classNames('h-5 bg-cyan-200 mr-6 rounded-md', className)}
      ></div>
    </div>
  );
}
