const defaultTheme = require('tailwindcss/defaultTheme');

const screens = {
  xsm: '480px',
  ...defaultTheme.screens,
};

module.exports = {
  screens
};
