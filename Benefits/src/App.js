import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';

import { Navigator } from './navigation';
import { persistor, store } from './state';

const App = () => {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <NavigationContainer>
          <Navigator/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

App.propTypes = {};

export default App;