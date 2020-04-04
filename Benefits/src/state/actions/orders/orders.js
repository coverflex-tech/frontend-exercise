import createAction from '../../../network/create-action';
import { getApiURL } from '../../../network/config';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ORDERS_CLEAR_DATA = 'ORDERS_CLEAR_DATA';
export const ORDER_PRODUCTS_FAIL = 'ORDER_PRODUCTS_FAIL';
export const ORDER_PRODUCTS_REQUEST = 'ORDER_PRODUCTS_REQUEST';
export const ORDER_PRODUCTS_SUCCESS = 'ORDER_PRODUCTS_SUCCESS';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = product => ({ type: ADD_TO_CART, payload: product });
export const clearData = () => ({ type: ORDERS_CLEAR_DATA, payload: null });
export const removeFromCart = productId => ({ type: REMOVE_FROM_CART, payload: productId });

export const order = data => createAction({
  meta: null,
  request: {
    data,
    method: 'POST',
    url: getApiURL('orders')
  },
  types: [
    ORDER_PRODUCTS_REQUEST,
    ORDER_PRODUCTS_SUCCESS,
    ORDER_PRODUCTS_FAIL
  ]
});