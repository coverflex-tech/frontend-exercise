import React from 'react';
import {
  Alert,
  Button,
  Text,
  View,
} from 'react-native';
import { object } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import * as ordersActions from '../../state/actions/orders';

import styles from './styles';

/**
 * OrderListItem.
 *
 * Renders a OrderListItem component.
 *
 * @param {object} props - Component Props.
 * @param {object} props.product - The product.
 *
 * @returns {React.ReactElement} - React element.
 *
 * @example
 * <OrderListItem products={ {} }/>
 */

const OrderListItem = ({
  product,
}) => {
  const dispatch = useDispatch();

  function didTapRemoveButton() {
    dispatch(ordersActions.removeFromCart(product.id));
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.itemView }>
        <Text style={ styles.itemName }>{ product.name }</Text>
        <Text style={ styles.itemPrice }>Price: {product.price}</Text>
      </View>
      <Button
        color="green"
        onPress={ () => didTapRemoveButton() }
        title="Remove"
      />
    </View>
  );
}

OrderListItem.propTypes = {
  product: object,
};

export default OrderListItem;
