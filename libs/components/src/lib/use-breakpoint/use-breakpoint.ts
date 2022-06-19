import _useBreakpoint from 'use-breakpoint';
import defaultTheme from 'tailwindcss/defaultTheme';

const screens = defaultTheme!.screens as Record<string, string>;

const projectScreens: Record<string, string> = {
  xsm: '480px',
  ...screens,
};

const BREAKPOINTS = Object.keys(projectScreens).reduce(
  (breakpoints, screen) => {
    breakpoints[screen] = Number(projectScreens[screen].replace('px', ''));
    return breakpoints;
  },
  {} as Record<string, number>
);

const sortedValues = [0, ...Object.values(BREAKPOINTS)].sort((a, b) => a - b);

Object.keys(BREAKPOINTS).forEach((key) => {
  const indexToSwitch = sortedValues.indexOf(BREAKPOINTS[key]) - 1;
  BREAKPOINTS[key] = sortedValues[indexToSwitch];
});

export function useBreakpoint() {
  return _useBreakpoint(BREAKPOINTS);
}
