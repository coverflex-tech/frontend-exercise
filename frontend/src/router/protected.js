import { useRecoilValue } from 'recoil';
import {
  useLocation,
	Redirect,
  Route
} from 'react-router-dom';

import { userAtom } from '../store/user';

export default function ProtectedRoute(props) {
	const { pathname } = useLocation();
	const userId = useRecoilValue(userAtom);

	if (!userId) {
		return <Redirect
			to={{
				pathname: "/login",
				state: { referrer: pathname }
			}}
		/>
	}

	return <Route {...props} />;
}
