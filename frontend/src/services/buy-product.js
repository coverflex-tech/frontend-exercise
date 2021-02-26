export default async function buyProduct({ productId, userId }) {
	try {
		const data = await fetch('http://localhost:4000/api/orders', {
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

		return data.json();
	} catch (error) {
		return error;
	}
}
