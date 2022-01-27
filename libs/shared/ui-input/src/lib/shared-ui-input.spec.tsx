import { render } from '@testing-library/react';

import SharedUiInput from './shared-ui-input';

describe('SharedUiInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUiInput />);
    expect(baseElement).toBeTruthy();
  });
});
