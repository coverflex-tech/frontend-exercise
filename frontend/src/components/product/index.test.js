import { fireEvent, render, screen } from '@testing-library/react';
import { useRecoilValue } from 'recoil';

import Product from './index';

jest.mock('../../store/product', () => ({
	productInfo: jest.fn()
}));

jest.mock('recoil', () => ({
	...jest.requireActual('recoil'),
	useRecoilValue: jest.fn()
}));

test('renders the normal Product component', () => {
	useRecoilValue.mockReturnValue({ name: 'test' });
	const productId = 'productId';

	const { container } = render(<Product productId={productId} />);

	expect(container.firstChild).toMatchSnapshot();
});

test('renders the normal Product component with buy message (with price)', () => {
	useRecoilValue.mockReturnValue({ name: 'test', price: 20 });
	const productId = 'productId';

	const { container } = render(<Product productId={productId} actionMessage />);

	expect(container.firstChild).toMatchSnapshot();
});

test('onClick should return productId', () => {
	useRecoilValue.mockReturnValue({ name: 'test' });
	const productId = 'productId';
	const onClick = jest.fn();

	render(<Product productId={productId} onClick={onClick} />);

	fireEvent.click(screen.getByRole('button'));

	expect(onClick).toBeCalledWith(productId);
});
