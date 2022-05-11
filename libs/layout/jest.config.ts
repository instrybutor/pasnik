module.exports = {
  displayName: 'layout',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/layout',
  preset: '../../jest.preset.ts',
};
