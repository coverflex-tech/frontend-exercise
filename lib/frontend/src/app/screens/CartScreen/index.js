import React, {Component} from 'react';
import {View, FlatList, Text, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import CartCell from '../../components/CartCell';
import {processOrder, removeFromCart} from '../../redux/productsRedux';

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
      <View style={{flex: 1, backgroundColor: '#7e8e9f'}}>
        <View
          style={{
            padding: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#333'}}>Total value:</Text>
            <Text style={{fontSize: 20, color: '#333'}}>{cartValue}</Text>
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
          <View style={{alignItems: 'center', marginBottom: 36}}>
            <Text style={{color: 'red'}}>{error}</Text>
          </View>
        )}
        <View style={{marginBottom: 36}}>
          <TouchableOpacity
            disabled={cartProducts.length === 0}
            style={{
              marginHorizontal: 24,
              backgroundColor: '#ff9577',
              paddingVertical: 24,
              alignItems: 'center',
              borderRadius: 8,
              opacity: cartProducts.length === 0 ? 0.5 : 1
            }}
            onPress={this.confirmOrder}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
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
