import { useRecoilValue } from 'recoil';

import { userAtom } from '../../store/user';

export default function User() {
	const userId = useRecoilValue(userAtom);

	return `user: ${userId}`;
}
