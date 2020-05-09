import React, {Component} from 'react';
import {View, FlatList, Text, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import CartCell from '../../components/CartCell';
import {processOrder, removeFromCart} from '../../redux/productsRedux';
import styles from './styles';

class CartScreen extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.processOrderSuccess !== this.props.processOrderSuccess &&
      this.props.processOrderSuccess
    ) {
      this.props.navigation.pop();
    }
  }

  onPressCartItem = (product) => {
    this.showAlert(product);
  };

  showAlert = (product) => {
    const {removeFromMyCart} = this.props;

    return Alert.alert(
      'Remove product',
      'Are you sure you want to remove this product',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => removeFromMyCart(product)},
      ],
      {cancelable: false},
    );
  };

  confirmOrder = () => {
    this.props.processOrder();
  };

  render() {
    const {cartProducts, cartValue, error} = this.props;

    return (
      <View style={styles.container}>
        <View
          style={styles.headerContainer}>
          <View>
            <Text style={styles.titleLabel}>Total value:</Text>
            <Text style={styles.subtitleLabel}>{cartValue}</Text>
          </View>
        </View>
        <FlatList
          data={cartProducts}
          renderItem={({item}) => (
            <CartCell product={item} onPress={this.onPressCartItem} />
          )}
          keyExtractor={(item) => item.id}
        />
        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={{marginBottom: 36}}>
          <TouchableOpacity
            disabled={cartProducts.length === 0}
            style={[styles.button, {opacity: cartProducts.length === 0 ? 0.5 : 1}]}
            onPress={this.confirmOrder}>
            <Text style={styles.buttonText}>
              Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.products.cartProducts,
    cartValue: state.products.cartValue,
    error: state.products.error,
    processOrderSuccess: state.products.processOrderSuccess,
  };
};

export default connect(mapStateToProps, {
  removeFromMyCart: removeFromCart,
  processOrder: processOrder,
})(CartScreen);
