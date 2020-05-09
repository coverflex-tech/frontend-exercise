import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class TableCell extends Component {
  onPress = () => {
    const {onPress, product} = this.props;
    onPress(product.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
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
            <Text>
              {this.props.isCartItem
                ? 'Already in cart'
                : this.props.isUserItem
                ? 'Already owned'
                : 'Not owned'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default TableCell;
