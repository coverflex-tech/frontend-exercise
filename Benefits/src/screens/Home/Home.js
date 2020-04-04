import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as ordersSelectors from '../../state/selectors/orders';
import * as productsActions from '../../state/actions/products';
import * as productsSelectors from '../../state/selectors/products';
import * as signinActions from '../../state/actions/signin';
import * as signinSelectors from '../../state/selectors/signin';
import { screenNames } from '../../navigation';

import ProductListItem from '../../components/ProductListItem';

import styles from './styles';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [availableProducts, setAvailableProducts] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const currentCart = useSelector(ordersSelectors.getCart);
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

      return;
    }

    if (productsData && signinData) {
      setAvailableProducts(productsData.products.filter(item => !signinData.user.data.product_ids.includes(item.id)));
    }
  }, [ productsData, signinData ]);

  useEffect(() => {
    var currentBalance = signinData.user.data.balance;

    currentCart.forEach(item => {
      currentBalance -= item.price;
    });

    setCurrentBalance(currentBalance);
  }, [ currentCart ]);

  function didTapLogoutButton() {
    dispatch(signinActions.signout());
    navigation.goBack();
  }

  return (
    <View style={ styles.body }>
      <StatusBar barStyle="dark-content" />
      <View style={ styles.userInfo }>
        <View style={ styles.currentInfo }>
          <Text style={ styles.userNameText }>Username: { signinData ? signinData.user.user_id : null }</Text>
          <Text style={ styles.currentBalanceText }>Current Balance: { currentBalance }</Text>
        </View>
        <Button
          color="green"
          onPress={ () => currentCart.length > 0 ? navigation.navigate(screenNames.ORDER_SCREEN) : {} }
          title="Cart"
        />
      </View>
      <View style={ styles.productsListView }>
        <FlatList
          data={ availableProducts }
          renderItem={ ({ item }) => {
            return (<ProductListItem currentBalance={ currentBalance } product={ item }/>);
          } }
        />
      </View>
    </View>
  );
};

Home.propTypes = {};

export default Home;
