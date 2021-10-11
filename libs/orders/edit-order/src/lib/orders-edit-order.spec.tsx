import { render } from '@testing-library/react';

import OrdersEditOrder from './orders-edit-order';

describe('OrdersEditOrder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrdersEditOrder />);
    expect(baseElement).toBeTruthy();
  });
});
