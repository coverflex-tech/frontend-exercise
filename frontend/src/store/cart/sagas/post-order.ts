import { AnyAction } from "redux";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { postOrder, PostOrderOutput } from "../../../api";
import { ActionTypes, getUser, User, Product } from "../..";
import { postOrderSuccess } from "..";

function* handlePostOrderRequest(action: AnyAction): Generator {
  try {
    const user = (yield select(getUser)) as User;
    const items = action.items.map((item: Product) => item.id);

    const order = (yield call(postOrder, {
      items,
      user_id: user.username,
    })) as PostOrderOutput;

    yield put(postOrderSuccess(order.order.data));
  } catch (e) {}
}

export function* watchPostOrderRequest(): Generator {
  yield takeLatest(ActionTypes.POST_ORDER_REQUEST, handlePostOrderRequest);
}
