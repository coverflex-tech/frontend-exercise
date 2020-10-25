import { AnyAction } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchProducts, FetchProductsOutput } from "../../../api";
import { ActionTypes } from "../..";
import { fetchProductsSuccess, fetchProductsError } from "..";

function* handleFetchProductRequest(action: AnyAction): Generator {
  try {
    const products = (yield call(fetchProducts)) as FetchProductsOutput;
    yield put(
      fetchProductsSuccess(
        products.products.map((product) => {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
          };
        })
      )
    );
  } catch (e) {
    yield put(fetchProductsError());
  }
}

export function* watchFetchProductRequest(): Generator {
  yield takeLatest(
    ActionTypes.FETCH_PRODUCTS_REQUEST,
    handleFetchProductRequest
  );
}
