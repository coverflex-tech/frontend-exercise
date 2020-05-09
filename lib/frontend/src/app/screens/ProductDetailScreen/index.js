import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addToCart, removeFromCart} from '../../redux/productsRedux';

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
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: '#7e8e9f',
        }}>
        <View>
          <View
            style={{
              width: '100%',
              paddingVertical: 20,
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#333'}}>
              {product.name}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 24,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#333'}}>
              Price:{' '}
            </Text>
            <Text style={{fontSize: 20, color: '#333'}}>{product.price}</Text>
          </View>
          {!!error && (
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'red'}}>{error}</Text>
            </View>
          )}
        </View>
        <View style={{marginBottom: 36}}>
          <TouchableOpacity
            disabled={this.isUserItem()}
            style={{
              marginHorizontal: 24,
              backgroundColor: '#ff9577',
              paddingVertical: 24,
              alignItems: 'center',
              borderRadius: 8,
              opacity: this.isUserItem() ? 0.5 : 1
            }}
            onPress={this.onButtonPress}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
              {this.isUserItem()
                ? 'Remove from my products'
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
