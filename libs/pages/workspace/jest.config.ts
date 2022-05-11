module.exports = {
  displayName: 'pages-workspace',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/pages/workspace',
  preset: '../../../jest.preset.ts',
};
