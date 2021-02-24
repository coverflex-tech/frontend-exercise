import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';

import User from './index';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}))

test('renders the normal User', () => {
  useParams.mockImplementation(() => ({ userId: 'test' }));

  const { container } = render(<User />);

  expect(container.firstChild).toMatchSnapshot()
});
