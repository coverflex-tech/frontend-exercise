import { render } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ProtectedRoute from './protected';

jest.mock('react-router-dom', () => ({
	useLocation: jest.fn(),
	Redirect({ to: { pathname, state: { referrer }}}) {
		return <redirect {...{ pathname, referrer }} />
	},
	Route(props) {
		return <route {...props} />
	}
}));

jest.mock('recoil', () => ({
	...jest.requireActual('recoil'),
	useRecoilValue: jest.fn()
}));

test('renders the Redirect route (without userId', () => {
	useLocation.mockImplementation(() => ({
		pathname: 'test'
	}))

	const { container } = render(<ProtectedRoute />);

  expect(container.firstChild).toMatchSnapshot()
});

test('renders the normal Route (with userId', () => {
	useRecoilValue.mockImplementation(() => 'userId');
	useLocation.mockImplementation(() => ({}))

	const { container } = render(<ProtectedRoute path='/test'>Test</ProtectedRoute>);

  expect(container.firstChild).toMatchSnapshot()
});
