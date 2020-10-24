import { AnyAction } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUser, FetchUserOutput } from "../../../api";
import { fetchUserSuccess, fetchUserError, ActionTypes } from "../..";

function* handleFetchUserRequest(action: AnyAction): Generator {
  try {
    const { username } = action;
    const user = (yield call(fetchUser, username)) as FetchUserOutput;
    yield put(
      fetchUserSuccess({
        username: user.user.user_id,
        balance: user.user.data.balance,
      })
    );
  } catch (e) {
    yield put(fetchUserError());
  }
}

export function* watchFetchUserRequest(): Generator {
  yield takeLatest(ActionTypes.FETCH_USER_REQUEST, handleFetchUserRequest);
}
