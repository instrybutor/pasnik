module.exports = {
  displayName: 'pages-login',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/pages/login',
  preset: '../../../jest.preset.ts',
};
