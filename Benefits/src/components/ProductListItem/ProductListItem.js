import React from 'react';
import {
  Alert,
  Button,
  Text,
  View,
} from 'react-native';
import { number, object } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import * as ordersActions from '../../state/actions/orders';
import * as ordersSelectors from '../../state/selectors/orders';

import styles from './styles';

/**
 * ProductListItem.
 *
 * Renders a ProductListItem component.
 *
 * @param {object} props - Component Props.
 * @param {number} props.currentBalance - The user's current balance.
 * @param {object} props.product - Product object.
 *
 * @returns {React.ReactElement} - React element.
 *
 * @example
 * <ProductListItem currentBalance={ 0 } product={ {} }/>
 */

const ProductListItem = ({
  currentBalance,
  product,
}) => {
  const dispatch = useDispatch();
  const currentCart = useSelector(ordersSelectors.getCart);

  function didTapOrderButton() {
    if (currentCart.filter(item => product.id === item.id).length > 0) {
      Alert.alert(
        'Error',
        'Product already added.'
      );

      return;
    }

    if (product.price > currentBalance) {
      Alert.alert(
        'Error',
        'You dont have enough balance.'
      );

      return;
    }

    dispatch(ordersActions.addToCart(product));
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.itemView }>
        <Text style={ styles.itemName }>{ product.name }</Text>
        <Text style={ styles.itemPrice }>Price: {product.price}</Text>
      </View>
      <Button
        color="green"
        onPress={ () => didTapOrderButton() }
        title="Order"
      />
    </View>
  );
}

ProductListItem.propTypes = {
  currentBalance: number,
  product       : object,
};

export default ProductListItem;
