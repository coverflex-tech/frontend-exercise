import { render } from '@testing-library/react';
import { useRecoilValue } from 'recoil';

import User from './index';

jest.mock('recoil', () => ({
	...jest.requireActual('recoil'),
	useRecoilValue: jest.fn()
}));

test('renders the normal User Page', () => {
	useRecoilValue.mockReturnValueOnce(['productId1', 'productId2']);
	useRecoilValue.mockReturnValueOnce(60);
	useRecoilValue.mockReturnValue('test');

	const { container } = render(<User />);

	expect(container.firstChild).toMatchSnapshot();
});

test('renders the normal User Page without products subscripton', () => {
	useRecoilValue.mockReturnValueOnce([]);
	useRecoilValue.mockReturnValueOnce(500);
	useRecoilValue.mockReturnValue('test');

	const { container } = render(<User />);

	expect(container.firstChild).toMatchSnapshot();
});
