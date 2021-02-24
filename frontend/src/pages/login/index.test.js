import { render } from '@testing-library/react';
import { useLocation } from 'react-router-dom';

import Login from './index';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn()
}))

test('renders the normal Login', () => {
  useLocation.mockImplementation(() => ({}));

  const { container } = render(<Login />);

  expect(container.firstChild).toMatchSnapshot()
});
