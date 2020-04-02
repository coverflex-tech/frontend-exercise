import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Signin } from '../screens';
import { screenNames } from './screen-names';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName={ screenNames.SIGN_IN_SCREEN }>
      <Stack.Screen name={ screenNames.SIGN_IN_SCREEN } component={ Signin } options={{ headerShown: false }} />
      <Stack.Screen name={ screenNames.HOME_SCREEN } component={ Home } />
    </Stack.Navigator>
  );
}
