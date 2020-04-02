import React, { useState } from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { screenNames } from '../../navigation';

import styles from './styles';

const Signin = ({ navigation }) => {
  const [username, setUsername] = useState('');

  return (
    <View style={ styles.body }>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
        <KeyboardAvoidingView
          behavior={ 'padding' }
          enabled
          style={ styles.keyboardAvoidingView }
        >
          <Text style={ styles.headerText }>Benefits App</Text>
          <TextInput
            autoCorrect={ false }
            clearButtonMode={ true }
            keyboardType={ 'default' }
            onChangeText={ text => {
              setUsername(text);
              console.log(text);
            } }
            placeholder={ 'Sign in with your username' }
            style={ styles.textInput }
            value={ username }
          />
          <Button
            color="green"
            onPress={ () => navigation.navigate(screenNames.HOME_SCREEN) }
            title="Signin"
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

Signin.propTypes = {};

export default Signin;
