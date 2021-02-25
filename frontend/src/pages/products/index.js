import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import ProductsList from '../../blocks/products-list';
import { productsList } from '../../store/product';
import ProductModal from '../../blocks/product-modal';

export default function Products() {
	const [selectedProduct, setSelectedProduct] = useState();
	const products = useRecoilValue(productsList);

	const handleClick = useCallback(
		(productId) => setSelectedProduct(productId),
		[]
	);

	const handleClose = useCallback(() => setSelectedProduct(), []);

	return (
		<Container component='main'>
			<Typography component='h1' variant='h5'>
				Products
			</Typography>

			<ProductsList onClick={handleClick} products={products} />

			<ProductModal productId={selectedProduct} onClose={handleClose} />
		</Container>
	);
}
