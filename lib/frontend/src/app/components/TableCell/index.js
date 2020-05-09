import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from "./styles";

class TableCell extends Component {
  onPress = () => {
    const {onPress, product} = this.props;
    onPress(product.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View
          style={styles.container}>
          <View>
            <Text style={styles.nameTexts}>
              {this.props.product.name}
            </Text>
            <Text>Price: {this.props.product.price}</Text>
          </View>
          <View style={styles.statusText}>
            <Text>
              {this.props.isUserItem
                ? 'Already owned'
                : this.props.isCartItem
                ? 'Already in cart'
                : 'Not owned'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default TableCell;
