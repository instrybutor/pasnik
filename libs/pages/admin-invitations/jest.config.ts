export default {
  displayName: 'pages-admin-invitation',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/pages/admin-invitation',
  preset: '../../../jest.preset.js',
};
