import { render } from '@testing-library/react';

import SharedUiSelect from './shared-ui-select';

describe('SharedUiSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUiSelect />);
    expect(baseElement).toBeTruthy();
  });
});
