module.exports = {
  displayName: 'shared-utils',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/shared/utils',
  preset: '../../../jest.preset.ts',
};
