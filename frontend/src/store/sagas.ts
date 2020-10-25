import { all, fork } from "redux-saga/effects";
import { userSaga } from "./user";
import { productSaga } from "./products";
import { cartSaga } from "./cart";

export function* rootSaga(): Generator {
  yield all([fork(userSaga), fork(productSaga), fork(cartSaga)]);
}
