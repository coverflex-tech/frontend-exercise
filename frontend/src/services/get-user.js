export default async function getUser(userId) {
	const data = await fetch(`http://localhost:4000/api/users/${userId}`);

	return await data.json();
}
