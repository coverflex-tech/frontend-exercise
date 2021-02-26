import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { userAtom } from '../../store/user';
import md5 from '../../util/md5';

export default function UserAvatar({ onClick }) {
	const userId = useRecoilValue(userAtom);

	const md5mail = useMemo(() => {
		let mail = userId;

		// this is just a simple check
		if (mail.indexOf('@') === -1) {
			mail += '@gmail.com';
		}

		return md5(mail);
	}, [userId]);

	return (
		<IconButton onClick={onClick}>
			<Avatar src={`https://www.gravatar.com/avatar/${md5mail}`} />
		</IconButton>
	);
}

UserAvatar.propTypes = {
	onClick: PropTypes.func
};
