import { fireEvent, render, screen } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import MenuApp from './index';

jest.mock('recoil', () => ({
	...jest.requireActual('recoil'),
	useRecoilValue: jest.fn()
}));

jest.mock('react-router-dom', () => ({
	useHistory: jest.fn()
}));

test('renders the normal MenuApp block', () => {
	const { container } = render(<MenuApp />);

	expect(container.firstChild).toMatchSnapshot();
});

test('renders the normal MenuApp block after login', () => {
	useRecoilValue.mockReturnValue('test');

	const { container } = render(<MenuApp />);

	expect(container.firstChild).toMatchSnapshot();
});

test('clicking Products should navigate to Products Page', () => {
	const push = jest.fn();
	useHistory.mockReturnValue({ push });
	useRecoilValue.mockReturnValue('test');

	render(<MenuApp />);

	fireEvent.click(screen.getByText('Products'));

	expect(push).toBeCalledWith('/products');
});

test('clicking Avatar should navigate to User Page', () => {
	const push = jest.fn();
	useHistory.mockReturnValue({ push });
	useRecoilValue.mockReturnValue('test');

	render(<MenuApp />);

	fireEvent.click(screen.getByRole('img'));

	expect(push).toBeCalledWith('/user/test');
});
