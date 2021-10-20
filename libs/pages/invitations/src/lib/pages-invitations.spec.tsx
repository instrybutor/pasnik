import { render } from '@testing-library/react';

import PagesInvitations from './pages-invitations';

describe('PagesInvitations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesInvitations />);
    expect(baseElement).toBeTruthy();
  });
});
