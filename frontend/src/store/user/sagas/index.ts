import { all, fork } from "redux-saga/effects";
import { watchFetchUserRequest } from "./fetch-user";

export function* userSaga(): Generator {
  yield all([fork(watchFetchUserRequest)]);
}
