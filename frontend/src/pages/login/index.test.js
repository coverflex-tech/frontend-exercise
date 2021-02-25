import { render, fireEvent, screen } from '@testing-library/react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import getUser from '../../services/get-user';

import Login from './index';

jest.mock('../../services/get-user', () => jest.fn());

jest.mock('recoil', () => ({
	...jest.requireActual('recoil'),
	useSetRecoilState: jest.fn()
}));

jest.mock('react-router-dom', () => ({
	useLocation: jest.fn(),
	useHistory: jest.fn()
}));

test('renders the normal Login Page', () => {
	useLocation.mockReturnValue({});
	useHistory.mockReturnValue({});

	const { container } = render(<Login />);

	expect(container.firstChild).toMatchSnapshot();
});

test('onSubmit should fetch the userInfo and navigate to the user page', async () => {
	const push = jest.fn();
	const setUser = jest.fn();
	const user = { user_id: 'test' };
	useSetRecoilState.mockReturnValue(setUser);
	useHistory.mockReturnValue({ push });
	getUser.mockReturnValue({ user });
	useLocation.mockReturnValue({});

	render(<Login />);

	fireEvent.change(screen.getByTestId('username'), {
		target: { value: 'userId' }
	});
	fireEvent.click(screen.getByText('Sign In'));

	// with the async callback, we need to wait for the next tick
	await Promise.resolve();

	expect(getUser).toHaveBeenCalledWith('userId');
	expect(setUser).toHaveBeenCalledWith(user);
	expect(push).toHaveBeenCalledWith('/user/test');
});

test('onSubmit should navigate to the referrer page', async () => {
	const push = jest.fn();
	useSetRecoilState.mockReturnValue(jest.fn());
	useHistory.mockReturnValue({ push });
	getUser.mockReturnValue({ user: {} });
	useLocation.mockReturnValue({ state: { referrer: 'testPage' } });

	render(<Login />);

	fireEvent.change(screen.getByTestId('username'), {
		target: { value: 'test' }
	});
	fireEvent.click(screen.getByText('Sign In'));

	// with the async callback, we need to wait for the next tick
	await Promise.resolve();

	expect(push).toHaveBeenCalledWith('testPage');
});

test('onSubmit should navigate to the user page, if referrer is other user page', async () => {
	const push = jest.fn();
	useSetRecoilState.mockReturnValue(jest.fn());
	useHistory.mockReturnValue({ push });
	getUser.mockReturnValue({ user: { user_id: 'test' } });
	useLocation.mockReturnValue({ state: { referrer: '/user/fake' } });

	render(<Login />);

	fireEvent.change(screen.getByTestId('username'), {
		target: { value: 'userId' }
	});
	fireEvent.click(screen.getByText('Sign In'));

	// with the async callback, we need to wait for the next tick
	await Promise.resolve();

	expect(push).toHaveBeenCalledWith('/user/test');
});
