import { forwardRef, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

import { productInfo } from '../../store/product';

import styles from './style.module.scss';

const Product = forwardRef(function Product(
	{ actionMessage, productId, className, onClick },
	ref
) {
	const product = useRecoilValue(productInfo(productId));

	const handleClick = useCallback(() => onClick(productId), [
		onClick,
		productId
	]);

	return (
		<Card
			className={classNames(styles.container, className)}
			tabIndex='1'
			ref={ref}
		>
			<CardActionArea className={styles.action} onClick={handleClick}>
				<CardHeader title={product.name} />

				<CardMedia image={`/icons/${productId}.svg`} className={styles.media} />

				{!!actionMessage && (
					<Typography>Click to buy ({product.price})</Typography>
				)}
			</CardActionArea>
		</Card>
	);
});

Product.propTypes = {
	actionMessage: PropTypes.bool,
	productId: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func
};

export default Product;
