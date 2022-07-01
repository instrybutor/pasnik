import classNames from 'classnames';

export interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'type'> {
  type?: 'button' | 'submit' | 'reset';
  icon?(props: React.ComponentProps<'svg'>): JSX.Element;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  className,
  icon: Icon,
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={classNames(
        'inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-300',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
