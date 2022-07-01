export default {
  displayName: 'features-notifications',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/features/notifications',
  preset: '../../../jest.preset.js',
};
