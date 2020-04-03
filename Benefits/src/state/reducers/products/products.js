import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from '../../actions/products';

export const initialState = {
  data   : null,
  error  : null,
  loading: false,
};

function products(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_FAIL:
      return {
          data   : null,
          error  : action.payload,
          loading: false,
      };

    case GET_PRODUCTS_REQUEST:
      return {
          ...state,
          loading: true,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
          data   : action.payload,
          error  : null,
          loading: false,
      };

  default:
      return state;
  }
}

export default products;
