import { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import getUser from '../../services/get-user';
import { userState } from '../../store/user';

import styles from './style.module.scss';

const redirect = (referrer, userId) => {
	if (!referrer || referrer.startsWith('/user/')) {
		return `/user/${userId}`;
	}

	return referrer;
};

export default function Login() {
	const setUser = useSetRecoilState(userState);
	const { state } = useLocation();
	const history = useHistory();
	const textRef = useRef();

	const handleSubmit = useCallback(async () => {
		try {
			const { user } = await getUser(textRef.current.value);

			setUser(user);

			history.push(redirect(state?.referrer, user.user_id));
		} catch (error) {
			console.error(error);
		}
	}, [history, setUser, state?.referrer]);

	return (
		<Container component='main' maxWidth='xs'>
			<div className={styles.container}>
				<Avatar>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<TextField
					inputRef={textRef}
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='username'
					inputProps={{
						'data-testid': 'username'
					}}
					label='User Name'
					name='username'
					autoComplete='username'
					autoFocus
				/>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
					onClick={handleSubmit}
				>
					Sign In
				</Button>
			</div>
		</Container>
	);
}
