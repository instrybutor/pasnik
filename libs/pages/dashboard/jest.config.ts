export default {
  displayName: 'pages-dashboard',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/pages/dashboard',
  preset: '../../../jest.preset.js',
};
