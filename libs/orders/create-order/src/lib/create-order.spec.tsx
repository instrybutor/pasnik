import { render } from '@testing-library/react';

import { CreateOrder } from './create-order.component';

describe('CreateOrder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateOrder />);
    expect(baseElement).toBeTruthy();
  });
});
