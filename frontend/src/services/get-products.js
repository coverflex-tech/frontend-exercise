export default async function getProducts() {
	const data = await fetch('http://localhost:4000/api/products');

	return data.json();
}
