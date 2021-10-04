import { render } from '@testing-library/react';

import PagesDashboard from './pages-dashboard';

describe('PagesDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
