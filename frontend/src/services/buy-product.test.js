import buyProduct from './buy-product';

let originalFetch;

beforeEach(() => {
	originalFetch = window.fetch;

	window.fetch = jest.fn();
});

afterEach(() => {
	window.fetch = originalFetch;
});

test('should make a post call to orders with userId and productId', async () => {
	const productId = 'productId';
	const userId = 'userId';
	const json = jest.fn().mockReturnValue('test');
	window.fetch.mockReturnValue({ json });

	const returnValue = await buyProduct({
		productId,
		userId
	});

	expect(window.fetch).toBeCalledWith('http://localhost:4000/api/orders', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			order: {
				items: [productId],
				user_id: userId
			}
		})
	});
	expect(returnValue).toBe('test');
});
