import { useCallback } from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';

import Product from '../../components/product';

import styles from './style.module.scss';

export default function ProductModal({ productId, onClose }) {
	const handleClick = useCallback(() => onClose(productId), [
		onClose,
		productId
	]);

	return (
		<Modal open={!!productId} onClose={onClose}>
			<Product
				className={styles.modal}
				productId={productId}
				onClick={handleClick}
				actionMessage
			/>
		</Modal>
	);
}

ProductModal.propTypes = {
	productId: PropTypes.string,
	onClose: PropTypes.func
};
