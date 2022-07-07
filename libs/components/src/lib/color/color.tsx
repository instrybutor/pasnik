import classNames from 'classnames';

export type COLOR_TYPE = 'primary' | 'secondary' | 'tertiary' | 'warn';

export const BG_COLOR_MAP: Record<COLOR_TYPE, string> = {
  primary:
    'bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 focus:ring-cyan-500 border border-transparent text-white',
  secondary:
    'bg-white hover:bg-gray-50 disabled:bg-gray-300 focus:ring-cyan-500 border border-gray-300 text-gray-700',
  tertiary:
    'bg-green-600 hover:bg-green-700 disabled:bg-gray-300 focus:ring-green-500 border border-transparent text-white',
  warn: 'bg-red-600 hover:bg-red-700 disabled:bg-gray-300 focus:ring-red-500 border border-transparent text-white',
};

export function getColor(colorType: COLOR_TYPE) {
  return classNames(
    BG_COLOR_MAP[colorType],
    'focus:outline-none focus:ring-2 focus:ring-offset-2'
  );
}
