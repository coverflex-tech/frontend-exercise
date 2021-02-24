import { render } from '@testing-library/react';

import Products from './index';

test('renders the normal Products', () => {
  const { container } = render(<Products />);

  expect(container.firstChild).toMatchSnapshot()
});
