import {takeEvery, call, put, select} from '@redux-saga/core/effects';
import * as api from '../services/api';
import {
  addToCartFailure,
  addToCartSuccess,
  fetchProductsFail,
  fetchProductsSuccess,
  getCartProducts,
  getUserDetail, processOrderFailure, processOrderSuccess,
  productTypes,
  removeFromCartSuccess,
  updateCartValue,
} from '../redux/productsRedux';

export function* fetchProducts() {
  const {response, error} = yield call(api.get, 'products');

  if (response && response.data && response.data.products) {
    yield put(fetchProductsSuccess(response.data.products));
  } else {
    yield put(fetchProductsFail(error));
  }
}

export function* addToCart(action) {
  let cartProducts = yield select(getCartProducts);

  let totalCartValue = 0;

  if (cartProducts.length > 0) {
    let user = yield select(getUserDetail);

    if (cartProducts.find((x) => x.id === action.product.id)) {
      return yield put(
        addToCartFailure('You already have this product in your account'),
      );
    }

    totalCartValue = cartProducts
      .map((item) => item.price)
      .reduce((prev, curr) => prev + curr, 0);

    if (totalCartValue + action.product.price > user.data.balance) {
      return yield put(addToCartFailure('Not enough balance for this product'));
    }
  }

  cartProducts.push(action.product);
  yield put(addToCartSuccess(cartProducts));
  yield put(updateCartValue(totalCartValue + action.product.price));
}

export function* removeFromCart(action) {
  let cartProducts = yield select(getCartProducts);

  const index = cartProducts.findIndex((item) => item.id === action.product.id);
  if (index > -1) {
    cartProducts.splice(index, 1);
  }

  let totalCartValue = 0;

  if (cartProducts.length > 0) {
    totalCartValue = cartProducts
      .map((item) => item.price)
      .reduce((prev, curr) => prev + curr, 0);
  }

  if (totalCartValue < 0) {
    totalCartValue = 0;
  }

  yield put(removeFromCartSuccess(cartProducts));
  yield put(updateCartValue(totalCartValue));
}

export function* processOrder() {
  let cartProducts = yield select(getCartProducts);
  let user = yield select(getUserDetail);

  const order = {
    order: {
      user_id: user.user_id,
    }
  };

  const items = [];
  cartProducts.map((item) => {
    items.push(item.id);
  });
  order.order.items = items;

  const {response, error} = yield call(api.post, 'orders', order);

  if (response && response.data && response.data.order) {

    yield put(processOrderSuccess());
  } else {
    yield put(processOrderFailure('There was an error!'));
  }
}

export function* watchFetchProducts() {
  yield takeEvery(productTypes.FETCH_PRODUCTS_REQUEST, fetchProducts);
}

export function* watchAddToCart() {
  yield takeEvery(productTypes.ADD_TO_CART, addToCart);
}

export function* watchRemoveFromCart() {
  yield takeEvery(productTypes.REMOVE_FROM_CART, removeFromCart);
}

export function* watchProcessOrder() {
  yield takeEvery(productTypes.PROCESS_ORDER, processOrder);
}
