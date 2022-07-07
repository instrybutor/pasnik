import classNames from 'classnames';
import { COLOR_TYPE, getColor } from '../color/color';
import { ComponentProps, forwardRef, HTMLProps } from 'react';

export interface ButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'ref'> {
  type?: 'button' | 'submit' | 'reset';
  icon?(props: ComponentProps<'svg'>): JSX.Element;
  rounded?: 'full' | 'md' | 'none';
  color?: COLOR_TYPE | 'none';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      children,
      className,
      icon: Icon,
      color,
      rounded,
      ...props
    },
    ref
  ) => {
    const colorClasses = color !== 'none' ? getColor(color ?? 'primary') : null;
    return (
      <button
        type={type}
        ref={ref}
        {...props}
        className={classNames(
          'inline-flex items-center p-1 shadow-sm',
          colorClasses,
          {
            'rounded-full': rounded === 'full',
            'rounded-md': !rounded || rounded === 'md',
          },
          className
        )}
      >
        {children}
      </button>
    );
  }
);

export default Button;
