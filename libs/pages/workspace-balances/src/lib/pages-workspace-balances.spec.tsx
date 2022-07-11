import { render } from '@testing-library/react';

import PagesWorkspaceBalances from './pages-workspace-balances';

describe('PagesWorkspaceBalances', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesWorkspaceBalances />);
    expect(baseElement).toBeTruthy();
  });
});
