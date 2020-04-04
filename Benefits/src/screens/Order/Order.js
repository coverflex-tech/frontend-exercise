import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as ordersActions from '../../state/actions/orders';
import * as ordersSelectors from '../../state/selectors/orders';
import * as signinActions from '../../state/actions/signin';
import * as signinSelectors from '../../state/selectors/signin';
import OrderListItem from '../../components/OrderListItem';

import styles from './styles';

const Order = ({ navigation }) => {
  const dispatch = useDispatch();
  const [orderTotal, setOrderTotal] = useState(0);
  const currentCart = useSelector(ordersSelectors.getCart);
  const ordersData = useSelector(ordersSelectors.getData);
  const ordersError = useSelector(ordersSelectors.getError);
  const signinData = useSelector(signinSelectors.getData);

  useEffect(() => {
    var orderTotal = 0;

    currentCart.forEach(item => {
      orderTotal += item.price;
    });

    setOrderTotal(orderTotal);
  }, [ currentCart ]);

  useEffect(() => {
    if (ordersError) {
      Alert.alert(
        'Ooooops',
        ordersError.message
      );
    }

    if (ordersData) {
      dispatch(signinActions.signin(signinData.user.user_id));
      dispatch(ordersActions.clearData());
      navigation.goBack();
    }
  }, [ ordersData, ordersError ]);

  function makeOrder() {
    const data = {
      order: {
        items: currentCart.map(item => item.id),
        user_id: signinData.user.user_id,
      }
    };

    dispatch(ordersActions.order(data));
  }

  return (
    <View style={ styles.body }>
      <StatusBar barStyle="dark-content" />
      <View style={ styles.orderListView }>
        <FlatList
          data={ currentCart }
          renderItem={ ({ item }) => {
            return (<OrderListItem product={ item }/>);
          } }
        />
      </View>
      <Text style={ styles.orderTotalText }>Order Total: { orderTotal }</Text>
      <Button
        color="green"
        onPress={ () => makeOrder() }
        title="Order"
      />
    </View>
  );
};

Order.propTypes = {};

export default Order;
