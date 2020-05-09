import React, {Component} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {signInRequest} from '../../redux/authRedux';
import styles from "./styles";

class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user && this.props.user.user_id) {
      this.props.navigation.navigate('ProductsScreen');
    }
  }

  onChangeText = (text) => {
    this.setState({
      username: text,
    });
  };

  onSubmitUsername = () => {
    this.props.signIn(this.state.username);
  };

  render() {
    const {username} = this.state;

    return (
      <View style={styles.container}>
          <Text style={styles.titleLabel}>Please enter your username</Text>

          <TextInput
            onChangeText={this.onChangeText}
            value={username}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={this.onSubmitUsername}
            style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>



      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  signIn: signInRequest,
})(HomeScreen);
