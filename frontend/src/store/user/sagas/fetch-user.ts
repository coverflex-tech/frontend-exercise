import { AnyAction } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUserSuccess, fetchUserError, ActionTypes } from "../..";

function* handleFetchUserRequest(action: AnyAction): Generator {
  try {
    const { username } = action;
    const user = yield call((username) => {
      return Promise.resolve(username);
    }, username);
    yield put(fetchUserSuccess(user as string));
  } catch (e) {
    yield put(fetchUserError());
  }
}

export function* watchFetchUserRequest(): Generator {
  yield takeLatest(ActionTypes.FETCH_USER_REQUEST, handleFetchUserRequest);
}
