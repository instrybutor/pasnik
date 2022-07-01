import classNames from 'classnames';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
}

export function Spinner({ size }: SpinnerProps) {
  const sizeClasses = classNames(
    {
      'text-3xl': size === 'sm',
      'text-6xl': size === 'md' || !size,
      'text-9xl': size === 'lg',
    },
    'animate-bounce'
  );

  return (
    <div className="px-4 py-14 flex flex-col gap-2 items-center justify-center">
      <span role="img" aria-label="food" className={sizeClasses}>
        🍔
      </span>
    </div>
  );
}

export default Spinner;
