export default {
  displayName: 'features-orders',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/features/orders',
  preset: '../../../jest.preset.js',
};
