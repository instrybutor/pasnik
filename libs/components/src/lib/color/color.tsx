import classNames from 'classnames';

export type COLOR_TYPE = 'primary' | 'secondary' | 'warn';

export const BG_COLOR_MAP: Record<COLOR_TYPE, string> = {
  primary: 'cyan',
  secondary: 'white',
  warn: 'red',
};

export const TEXT_COLOR_MAP: Record<COLOR_TYPE, string> = {
  primary: 'white',
  secondary: 'gray',
  warn: 'white',
};

export const DISABLED_COLOR_MAP: Record<COLOR_TYPE, string> = {
  primary: 'cyan',
  secondary: 'white',
  warn: 'red',
};

export function getColor(colorType: COLOR_TYPE, depth = 500) {
  return classNames(
    `text-${TEXT_COLOR_MAP[colorType]}`,
    `bg-${BG_COLOR_MAP[colorType]}-${depth}`,
    `hover:bg-${BG_COLOR_MAP[colorType]}-${depth + 100}`,
    `focus:outline-none focus:ring-2 focus:ring-offset-2`,
    `focus:ring-${BG_COLOR_MAP[colorType]}-${depth}`,
    `disabled:bg-${DISABLED_COLOR_MAP[colorType]}-${depth - 200}`
  );
}
