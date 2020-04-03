import createAction from '../../../network/create-action';
import { getApiURL } from '../../../network/config';

export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';
export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';

export const getProducts = () => createAction({
  meta: null,
  request: {
    url: getApiURL('products')
  },
  types: [
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL
  ]
});
