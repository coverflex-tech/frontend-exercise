import { render } from '@testing-library/react';
import { useRecoilValue } from 'recoil';

import Products from './index';

jest.mock('recoil', () => ({
	...jest.requireActual('recoil'),
	useRecoilValue: jest.fn()
}));

test('renders Products Page', () => {
	useRecoilValue.mockReturnValue(['productId1', 'productId2']);

	const { container } = render(<Products />);

	expect(container.firstChild).toMatchSnapshot();
});

test('renders Products Page with empty list', () => {
	useRecoilValue.mockReturnValue([]);

	const { container } = render(<Products />);

	expect(container.firstChild).toMatchSnapshot();
});
