import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addToCart, removeFromCart} from '../../redux/productsRedux';
import styles from './styles';

class ProductDetailScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      product: props.products.find((x) => x.id === props.selectedProductId),
      userProducts: props.user.data.product_ids || [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.updateCartSuccess !== this.props.updateCartSuccess &&
      this.props.updateCartSuccess
    ) {
      this.props.navigation.pop();
    }
  }

  onButtonPress = () => {
    if (this.isCartProduct()) {
      return this.props.removeFromMyCart(this.state.product);
    }

    this.props.addToMyCart(this.state.product);
  };

  isCartProduct = () => {
    const {cartProducts, selectedProductId} = this.props;
    return cartProducts.find((x) => x.id === selectedProductId);
  };

  isUserItem = () => {
    const {userProducts} = this.state;
    const {selectedProductId} = this.props;
    return userProducts.find((x) => x === selectedProductId);
  };

  render() {
    const {product} = this.state;
    const {error} = this.props;

    return (
      <View
        style={styles.container}>
        <View>
          <View
            style={styles.headerContainer}>
            <Text style={styles.titleLabel}>
              {product.name}
            </Text>
          </View>
          <View
            style={styles.subtitleContainer}>
            <Text style={styles.subtitleLabelBold}>
              Price:{' '}
            </Text>
            <Text style={styles.subtitleLabel}>{product.price}</Text>
          </View>
          {!!error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
        <View style={{marginBottom: 36}}>
          <TouchableOpacity
            disabled={this.isUserItem()}
            style={[styles.button, {opacity: this.isUserItem() ? 0.5 : 1}]}
            onPress={this.onButtonPress}>
            <Text style={styles.buttonText}>
              {this.isUserItem()
                ? 'Already owned'
                : this.isCartProduct()
                ? 'Remove from cart'
                : 'Add to cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    user: state.auth.user,
    selectedProductId: state.products.selectedProductId,
    error: state.products.error,
    updateCartSuccess: state.products.updateCartSuccess,
    cartProducts: state.products.cartProducts,
  };
};

export default connect(mapStateToProps, {
  addToMyCart: addToCart,
  removeFromMyCart: removeFromCart,
})(ProductDetailScreen);
