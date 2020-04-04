import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from './reducers';
import { api, logger } from './middlewares';

// Middleware: Redux persist config.
const persistConfig = {
  key      : 'root',
  storage  : AsyncStorage,
  // Whitelist (Save Specific Reducers).
  whitelist: [ 'signin' ],
  // Blacklist (Don't Save Specific Reducers).
  blacklist: [ 'orders', 'products' ],
  timeout  : 100,
};

// Middleware: Redux persist persisted reducer.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Configure store from the state model.
const store = createStore(
  persistedReducer,
  applyMiddleware(api, logger),
);

// Middleware: Redux Persist Persister.
let persistor = persistStore(store);

export {
  persistor,
  store,
};
