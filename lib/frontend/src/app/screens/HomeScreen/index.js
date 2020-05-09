import React, {Component} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {signInRequest} from '../../redux/authRedux';

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
    const {user} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: '#7e8e9f', paddingTop: 40, paddingHorizontal: 24}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>Please enter your username</Text>

          <TextInput
            onChangeText={this.onChangeText}
            value={username}
            style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ededed', paddingHorizontal: 16, paddingVertical: 8, fontSize: 16, marginBottom: 30}}
          />
          <TouchableOpacity
            onPress={this.onSubmitUsername}
            style={{
              backgroundColor: '#ff9577',
              paddingVertical: 24,
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>Submit</Text>
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
