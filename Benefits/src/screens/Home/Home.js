import React, { useLayoutEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as signinActions from '../../state/actions/signin';
import * as signinSelectors from '../../state/selectors/signin';

import styles from './styles';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const signinData = useSelector(signinSelectors.getData);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null),
      headerRight: () => (
        <Button onPress={() => didTapLogoutButton() } title="Logout" />
      ),
    });
  }, [ navigation ]);

  function didTapLogoutButton() {
    dispatch(signinActions.signout());
    navigation.goBack();
  }

  return (
    <View style={ styles.body }>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>I'm home</Text>
      </SafeAreaView>
    </View>
  );
};

Home.propTypes = {};

export default Home;
