import { render } from '@testing-library/react';

import Order from './order';

describe('Order', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Order />);
    expect(baseElement).toBeTruthy();
  });
});
