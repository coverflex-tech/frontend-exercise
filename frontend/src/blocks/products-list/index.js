import PropTypes from 'prop-types';

import Product from '../../components/product';

import styles from './style.module.scss';

export default function ProductsList({ products, onClick }) {
	return (
		<div className={styles.container}>
			{products.map((productId) => (
				<Product key={productId} productId={productId} onClick={onClick} />
			))}
		</div>
	);
}

ProductsList.propTypes = {
	products: PropTypes.arrayOf(PropTypes.string),
	onClick: PropTypes.func
};
