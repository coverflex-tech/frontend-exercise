import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';

import Product from '../../components/product';
import { userAtom } from '../../store/user';

import styles from './style.module.scss';
import buyProduct from '../../services/buy-product';

export default function ProductModal({ productId, onClose }) {
	const userId = useRecoilValue(userAtom);

	const handleClick = useCallback(async () => {
		let response;

		try {
			response = await buyProduct({
				productId,
				userId
			});
		} catch (error) {
			response = error;
		}

		onClose(response);
	}, [onClose, productId, userId]);

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
