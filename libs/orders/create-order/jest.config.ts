module.exports = {
  displayName: 'orders-create-order',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/orders/create-order',
  preset: '../../../jest.preset.ts',
};
