import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { screenNames } from '../../navigation';

import styles from './styles';

const Signin = ({ navigation }) => {
    return (
        <View style={ styles.body }>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <Text>Hey</Text>
            <Button
              onPress={ () => navigation.navigate(screenNames.HOME_SCREEN) }
              title="Signin"
              color="green"
            />
          </SafeAreaView>
        </View>
    );
};

Signin.propTypes = {};

export default Signin;
