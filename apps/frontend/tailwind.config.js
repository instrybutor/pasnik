const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const colors = require('tailwindcss/colors')

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
