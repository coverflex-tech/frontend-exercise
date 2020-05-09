import React, {Component} from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {store} from './src/app/store/store';
import HomeScreen from './src/app/screens/HomeScreen';
import ProductsScreen from './src/app/screens/ProductsScreen';
import ProductDetailScreen from './src/app/screens/ProductDetailScreen';
import CartScreen from './src/app/screens/CartScreen';

const Stack = createStackNavigator();

const headerStyle = {
  backgroundColor: '#ff9577',
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                title: 'Sign In',
                headerStyle: headerStyle,
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="ProductsScreen"
              component={ProductsScreen}
              options={{
                title: 'Store',
                headerStyle: headerStyle,
                headerLeft: null,
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
              options={{
                title: 'Product Detail',
                headerStyle: headerStyle,
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{
                title: 'Cart',
                headerStyle: headerStyle,
                headerTintColor: '#fff',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
