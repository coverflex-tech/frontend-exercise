import {
  ADD_TO_CART,
  ORDERS_CLEAR_DATA,
  ORDER_PRODUCTS_FAIL,
  ORDER_PRODUCTS_REQUEST,
  ORDER_PRODUCTS_SUCCESS,
  REMOVE_FROM_CART,
} from '../../actions/orders';

export const initialState = {
  cart   : [],
  data   : null,
  error  : null,
  loading: false,
};

function orders(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case ORDERS_CLEAR_DATA:
      return initialState;
    
    case ORDER_PRODUCTS_FAIL:
      return {
          cart   : state.cart,
          data   : null,
          error  : action.payload,
          loading: false,
      };

    case ORDER_PRODUCTS_REQUEST:
      return {
          ...state,
          loading: true,
      };

    case ORDER_PRODUCTS_SUCCESS:
      return {
          cart   : [],
          data   : action.payload,
          error  : null,
          loading: false,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

  default:
      return state;
  }
}

export default orders;
