import classNames from 'classnames';
import { COLOR_TYPE, getColor } from '../color/color';

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'type'> {
  type?: 'button' | 'submit' | 'reset';
  icon?(props: React.ComponentProps<'svg'>): JSX.Element;
  rounded?: 'full' | 'md';
  color?: COLOR_TYPE;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  className,
  icon: Icon,
  color,
  rounded,
  ...props
}) => {
  const colorClasses = getColor(color ?? 'primary', 600);
  return (
    <button
      type={type}
      {...props}
      className={classNames(
        'inline-flex items-center p-1 border border-transparent rounded-md shadow-sm',
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
};

export default Button;
