import { render } from '@testing-library/react';

import { EditOrder } from './edit-order';

describe('EditOrder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditOrder />);
    expect(baseElement).toBeTruthy();
  });
});
