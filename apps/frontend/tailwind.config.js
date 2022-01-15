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
      animation: {
        wiggle: 'wiggle 4s .7s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotateZ(0)' },
          '1%': { transform: 'rotateZ(30deg)' },
          '3%': { transform: 'rotateZ(-28deg)' },
          '5%': { transform: 'rotateZ(34deg)' },
          '7%': { transform: 'rotateZ(-32deg)' },
          '9%': { transform: 'rotateZ(30deg)' },
          '11%': { transform: 'rotateZ(-28deg)' },
          '13%': { transform: 'rotateZ(26deg)' },
          '15%': { transform: 'rotateZ(-24deg)' },
          '17%': { transform: 'rotateZ(22deg)' },
          '19%': { transform: 'rotateZ(-20deg)' },
          '21%': { transform: 'rotateZ(18deg)' },
          '23%': { transform: 'rotateZ(-16deg)' },
          '25%': { transform: 'rotateZ(14deg)' },
          '27%': { transform: 'rotateZ(-12deg)' },
          '29%': { transform: 'rotateZ(10deg)' },
          '31%': { transform: 'rotateZ(-8deg)' },
          '33%': { transform: 'rotateZ(6deg)' },
          '35%': { transform: 'rotateZ(-4deg)' },
          '37%': { transform: 'rotateZ(2deg)' },
          '39%': { transform: 'rotateZ(-1deg)' },
          '41%': { transform: 'rotateZ(1deg)' },
          '43%': { transform: 'rotateZ(0)' },
          '100%': { transform: 'rotateZ(0)' },
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      position: ['hover'],
      display: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
