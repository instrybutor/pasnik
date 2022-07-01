export default {
  displayName: 'orders-edit-order',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/orders/edit-order',
  preset: '../../../jest.preset.js',
};
