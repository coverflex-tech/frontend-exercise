import React, {Component} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchProductsRequest,
  setSelectedProductId,
} from '../../redux/productsRedux';
import TableCell from '../../components/TableCell';

class ProductsScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      userProducts: props.user.data.product_ids || [],
    };
  }

  componentDidMount() {
    const {fetchProducts} = this.props;
    fetchProducts();
  }

  onProductPush = (id) => {
    const {setSelectedProduct} = this.props;
    setSelectedProduct(id);
    this.props.navigation.navigate('ProductDetailScreen');
  };

  isUserItem = (id) => {
    const {userProducts} = this.state;
    return userProducts.find((x) => x === id);
  };

  isCartItem = (id) => {
    const {cartProducts} = this.props;
    return cartProducts.find((x) => x.id === id);
  };

  goToCart = () => {
    this.props.navigation.navigate('CartScreen');
  };

  render() {
    const {products, user, cartValue, cartProducts} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#7e8e9f'}}>
        <View style={{ padding: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Current balance: </Text>
            <Text style={{ fontSize: 20, color: '#333' }}>{user.data.balance}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Cart value:</Text>
            <Text style={{ fontSize: 20, color: '#333' }}>{cartValue}</Text>
          </View>
        </View>
        <FlatList
          data={products}
          renderItem={({item}) => (
            <TableCell
              product={item}
              isCartItem={this.isCartItem(item.id)}
              isUserItem={this.isUserItem(item.id)}
              onPress={this.onProductPush}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={{ marginBottom: 36}}>
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
            onPress={this.goToCart}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
              Go to cart
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
    cartProducts: state.products.cartProducts,
    cartValue: state.products.cartValue,
  };
};

export default connect(mapStateToProps, {
  fetchProducts: fetchProductsRequest,
  setSelectedProduct: setSelectedProductId,
})(ProductsScreen);
