import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import ProductsList from '../../blocks/products-list';
import ProductModal from '../../blocks/product-modal';
import { userInfoState } from '../../store/user';
import { productsList } from '../../store/product';
import Toast from '../../components/toast';

export default function Products() {
	const [selectedProduct, setSelectedProduct] = useState();
	const [toastInfo, setToastInfo] = useState();
	const updateUserInfo = useSetRecoilState(userInfoState);
	const products = useRecoilValue(productsList);

	const handleClick = useCallback(
		(productId) => setSelectedProduct(productId),
		[]
	);

	const handleClose = useCallback(
		({ order, error }) => {
			setToastInfo(error || order);

			if (order) {
				updateUserInfo(order.data.items);
			}

			setSelectedProduct();
		},
		[updateUserInfo]
	);

	const handleCloseToast = useCallback(() => setToastInfo(), []);

	return (
		<Container component='main'>
			<Typography component='h1' variant='h5'>
				Products
			</Typography>

			<ProductsList onClick={handleClick} products={products} />

			<ProductModal productId={selectedProduct} onClose={handleClose} />

			<Toast onClose={handleCloseToast} info={toastInfo} />
		</Container>
	);
}
