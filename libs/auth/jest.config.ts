module.exports = {
  displayName: 'auth',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/auth',
  preset: '../../jest.preset.ts',
};
