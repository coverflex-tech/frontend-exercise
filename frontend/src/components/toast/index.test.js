import { render } from '@testing-library/react';

import Toast from './index';

test('renders the normal Toast component', () => {
	const { container } = render(<Toast info='info' />);

	expect(container.firstChild).toMatchSnapshot();
});

test('renders the products_already_purchased Toast component', () => {
	const { container } = render(<Toast info='products_already_purchased' />);

	expect(container.firstChild).toMatchSnapshot();
});

test('renders the insufficient_balance Toast component', () => {
	const { container } = render(<Toast info='insufficient_balance' />);

	expect(container.firstChild).toMatchSnapshot();
});

test('renders the products_not_found Toast component', () => {
	const { container } = render(<Toast info='products_not_found' />);

	expect(container.firstChild).toMatchSnapshot();
});
