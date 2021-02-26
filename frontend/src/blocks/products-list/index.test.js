import { render } from '@testing-library/react';

import ProductsList from './index';

jest.mock(
	'../../components/product',
	() =>
		function FakeProduct(props) {
			return <button {...props} />;
		}
);

test('renders the normal ProductsList block', () => {
	const { container } = render(
		<ProductsList products={['productId1', 'productId2']} />
	);

	expect(container.firstChild).toMatchSnapshot();
});
