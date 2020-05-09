import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from "./styles";

class CartCell extends Component {
  onPress = () => {
    const {onPress, product} = this.props;
    onPress(product);
  };

  render() {
    return (

        <View
          style={styles.container}>
          <View>
            <Text style={styles.nameText}>
              {this.props.product.name}
            </Text>
            <Text>Price: {this.props.product.price}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.onPress} style={styles.button}>
              <Text style={styles.buttonText}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

export default CartCell;
