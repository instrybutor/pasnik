export default {
  displayName: 'features-workspaces',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/features/workspaces',
  preset: '../../../jest.preset.js',
};
