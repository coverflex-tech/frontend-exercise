import React, { useEffect, useLayoutEffect } from 'react';
import {
  Button,
  FlatList,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as productsActions from '../../state/actions/products';
import * as productsSelectors from '../../state/selectors/products';
import * as signinActions from '../../state/actions/signin';
import * as signinSelectors from '../../state/selectors/signin';

import ProductListItem from '../../components/ProductListItem';

import styles from './styles';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const productsData = useSelector(productsSelectors.getData);
  const signinData = useSelector(signinSelectors.getData);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (null),
      headerRight: () => (
        <Button onPress={() => didTapLogoutButton() } title="Logout" />
      ),
    });
  }, [ navigation ]);

  useEffect(() => {
    if (!productsData) {
      dispatch(productsActions.getProducts());
    }
  }, [ productsData ]);

  function didTapLogoutButton() {
    dispatch(signinActions.signout());
    navigation.goBack();
  }

  return (
    <View style={ styles.body }>
      <StatusBar barStyle="dark-content" />
      <View style={ styles.userInfo }>
        <Text style={ styles.userNameText }>Username: { signinData.user.user_id }</Text>
      </View>
      <View style={ styles.productsListView }>
        <FlatList
          data={ productsData.products }
          renderItem={ ({ item }) => {
            return (<ProductListItem product={ item }/>);
          } }
        />
      </View>
    </View>
  );
};

Home.propTypes = {};

export default Home;
