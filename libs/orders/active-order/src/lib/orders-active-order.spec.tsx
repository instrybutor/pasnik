import { render } from '@testing-library/react';

import OrdersActiveOrder from './orders-active-order';

describe('OrdersActiveOrder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrdersActiveOrder />);
    expect(baseElement).toBeTruthy();
  });
});
