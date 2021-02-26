import getUser from './get-user';

let originalFetch;

beforeEach(() => {
	originalFetch = window.fetch;

	window.fetch = jest.fn();
});

afterEach(() => {
	window.fetch = originalFetch;
});

test('should make a post call to orders with userId and productId', async () => {
	const userId = 'userId';
	const json = jest.fn().mockReturnValue('test');
	window.fetch.mockReturnValue({ json });

	const returnValue = await getUser(userId);

	expect(window.fetch).toBeCalledWith(
		`http://localhost:4000/api/users/${userId}`
	);
	expect(returnValue).toBe('test');
});
