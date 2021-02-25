import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import UserAvatar from '../../components/avatar';
import { userAtom } from '../../store/user';

import styles from './style.module.scss';

export default function MenuApp() {
	const userId = useRecoilValue(userAtom);
	const history = useHistory();

	const goToProductsPage = useCallback(() => history.push('/products'), [
		history
	]);

	const goToUserPage = useCallback(() => history.push(`/user/${userId}`), [
		history,
		userId
	]);

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' className={styles.title}>
					Cloverflex
				</Typography>
				{userId ? (
					<>
						<Button color='inherit' onClick={goToProductsPage}>
							Products
						</Button>
						<UserAvatar onClick={goToUserPage} />
					</>
				) : (
					<Button color='inherit'>Login</Button>
				)}
			</Toolbar>
		</AppBar>
	);
}
