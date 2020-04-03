import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import { object } from 'prop-types';

import styles from './styles';

/**
 * ProductListItem.
 *
 * Renders a ProductListItem component.
 *
 * @param {object} props - Component Props.
 * @param {string} props.product - Product object.
 *
 * @returns {React.ReactElement} - React element.
 *
 * @example
 * <ProductListItem product={ {} }/>
 */

const ProductListItem = ({
  product,
}) => {
  function didTapOrderButton() {
    console.log('ORDER');
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
  product: object,
};

export default ProductListItem;
