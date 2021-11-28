import { ReactElement } from 'react';

export interface StackedListItemWrapperProps {
  children?: ReactElement;
}

export interface StackedListItemProps {
  wrapper?: (props: StackedListItemWrapperProps) => JSX.Element;
  title?: ReactElement | string;
  titleRight?: ReactElement | string;
  subTitle?: ReactElement | string;
  subTitleRight?: ReactElement | string;
}

function EmptyWrapper({ children }: StackedListItemWrapperProps) {
  return children;
}

export function StackedListItem({
  title,
  titleRight,
  subTitleRight,
  subTitle,
  wrapper,
}: StackedListItemProps) {
  const Wrapper = wrapper || EmptyWrapper;
  return (
    <li>
      <Wrapper>
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-cyan-600 truncate">
              {title}
            </span>
            {titleRight && (
              <div className="ml-2 flex-shrink-0 flex">{titleRight}</div>
            )}
          </div>
          {(subTitleRight || subTitle) && (
            <div className="mt-2 sm:flex sm:justify-between">
              {subTitle && <div className="sm:flex sm:gap-x-6">{subTitle}</div>}
              {subTitleRight && (
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  {subTitleRight}
                </div>
              )}
            </div>
          )}
        </div>
      </Wrapper>
    </li>
  );
}
