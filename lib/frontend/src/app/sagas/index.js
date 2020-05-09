import {all, fork} from 'redux-saga/effects';

import {watchSignIn} from './authSagas';
import {
  watchFetchProducts,
  watchAddToCart,
  watchRemoveFromCart,
  watchProcessOrder,
} from './productSagas';

export function* rootSaga() {
  yield all([
    fork(watchSignIn),
    fork(watchFetchProducts),
    fork(watchAddToCart),
    fork(watchRemoveFromCart),
    fork(watchProcessOrder),
  ]);
}
