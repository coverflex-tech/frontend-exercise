import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class CartCell extends Component {
  onPress = () => {
    const {onPress, product} = this.props;
    onPress(product);
  };

  render() {
    return (

        <View
          style={{
            backgroundColor: 'white',
            borderBottomWidth: 2,
            borderBottomColor: '#dedede',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            paddingVertical: 16,
            flexDirection: 'row',
          }}>
          <View>
            <Text style={{fontWeight: 'bold', marginBottom: 6}}>
              {this.props.product.name}
            </Text>
            <Text>Price: {this.props.product.price}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.onPress} style={{ padding: 8, backgroundColor: 'red', borderRadius: 4 }}>
              <Text style={{ color: 'white' }}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

export default CartCell;
