import { combineReducers } from 'redux';

import authReducer from './authRedux';
import productsReducer from './productsRedux';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
});

export default rootReducer;
