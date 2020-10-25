import { all, fork } from "redux-saga/effects";
import { watchFetchProductRequest } from "./fetch-products";

export function* productSaga(): Generator {
  yield all([fork(watchFetchProductRequest)]);
}
