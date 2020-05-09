import {takeEvery, call, put} from '@redux-saga/core/effects';
import {authTypes, signInFail, signInSuccess} from '../redux/authRedux';
import * as api from '../services/api';

export function* signIn(action) {
  const {response, error} = yield call(api.get, `users/${action.username}`);

  if (response && response.data && response.data.user) {
    yield put(signInSuccess(response.data.user));
  } else {
    yield put(signInFail(error));
  }
}

export function* watchSignIn() {
  yield takeEvery(authTypes.SIGN_IN_REQUEST, signIn);
}
