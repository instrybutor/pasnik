const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),

  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    screens: {
      xsm: '480px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
