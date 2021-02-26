import { useRecoilValue } from 'recoil';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { userProductsAtom, userAtom, userBalanceAtom } from '../../store/user';
import ProductsList from '../../blocks/products-list';

import styles from './style.module.scss';
import UserAvatar from '../../components/avatar';

export default function User() {
	const products = useRecoilValue(userProductsAtom);
	const balance = useRecoilValue(userBalanceAtom);
	const userId = useRecoilValue(userAtom);

	return (
		<Container component='main'>
			<UserAvatar />
			<Typography component='h1' variant='h5'>
				{userId}
			</Typography>
			<Typography>balance: {balance}</Typography>

			<div className={styles.products}>
				{products.length ? (
					<>
						<Typography component='h2' variant='h6'>
							Subscribed Products
						</Typography>
						<ProductsList products={products} />
					</>
				) : (
					<Typography component='h2' variant='h6'>
						No Products subscribed
					</Typography>
				)}
			</div>
		</Container>
	);
}
