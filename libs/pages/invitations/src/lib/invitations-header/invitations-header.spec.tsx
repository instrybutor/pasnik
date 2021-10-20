import { render } from '@testing-library/react';

import InvitationsHeader from './invitations-header';

describe('InvitationsHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InvitationsHeader />);
    expect(baseElement).toBeTruthy();
  });
});
