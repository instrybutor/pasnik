module.exports = {
  displayName: 'pages-order',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/pages/order',
  preset: '../../../jest.preset.ts',
};
