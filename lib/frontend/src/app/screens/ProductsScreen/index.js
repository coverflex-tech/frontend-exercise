import React, {Component} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchProductsRequest,
  setSelectedProductId,
} from '../../redux/productsRedux';
import TableCell from '../../components/TableCell';
import styles from './styles';

class ProductsScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      userProducts: props.user.data.product_ids || [],
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.user.data.product_ids.length !== this.props.user.data.product_ids.length)
      this.updateUserProducts()
  }

  updateUserProducts = () => {
    this.setState({
      userProducts: this.props.user.data.product_ids
    })
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
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.titleLabel}>Current balance: </Text>
            <Text style={styles.subtitleLabel}>{user.data.balance}</Text>
          </View>
          <View>
            <Text style={styles.titleLabel}>Cart value:</Text>
            <Text style={styles.subtitleLabel}>{cartValue}</Text>
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
            style={[styles.button, {opacity: cartProducts.length === 0 ? 0.5 : 1}]}
            onPress={this.goToCart}>
            <Text style={styles.buttonText}>
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
