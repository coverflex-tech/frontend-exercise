import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as signinActions from '../../state/actions/signin';
import * as signinSelectors from '../../state/selectors/signin';
import { screenNames } from '../../navigation';

import styles from './styles';

const Signin = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const signinData = useSelector(signinSelectors.getData);
  const signinError = useSelector(signinSelectors.getError);

  useEffect(() => {
    if (signinError) {
      Alert.alert(
        'Ooooops',
        signinError.message
      );
    }

    if (signinData) {
      navigation.navigate(screenNames.HOME_SCREEN);
    }
  }, [ signinData, signinError ]);

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
            onPress={ () => username !== '' ? dispatch(signinActions.signin(username)) : {} }
            title="Signin"
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

Signin.propTypes = {};

export default Signin;
