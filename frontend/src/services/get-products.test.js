import getProducts from './get-products';

let originalFetch;

beforeEach(() => {
	originalFetch = window.fetch;

	window.fetch = jest.fn();
});

afterEach(() => {
	window.fetch = originalFetch;
});

test('should make a get call to products', async () => {
	const json = jest.fn().mockReturnValue('test');
	window.fetch.mockReturnValue({ json });

	const returnValue = await getProducts();

	expect(window.fetch).toBeCalledWith('http://localhost:4000/api/products');
	expect(returnValue).toBe('test');
});
