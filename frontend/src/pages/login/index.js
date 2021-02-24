import { useLocation } from 'react-router-dom';

export default function Login() {
	const { state } = useLocation();
	// eslint-disable-next-line no-unused-vars
	const redirect = state?.referrer || 'user';

	return 'Login';
}
