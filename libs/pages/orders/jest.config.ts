module.exports = {
  displayName: 'pages-orders',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/pages/orders',
  preset: '../../../jest.preset.ts',
};
