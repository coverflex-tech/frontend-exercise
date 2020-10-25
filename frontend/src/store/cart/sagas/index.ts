import { all, fork } from "redux-saga/effects";
import { watchPostOrderRequest } from "./post-order";

export function* cartSaga(): Generator {
  yield all([fork(watchPostOrderRequest)]);
}
