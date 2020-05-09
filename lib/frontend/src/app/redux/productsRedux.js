import mirrorCreator from 'mirror-creator';

const types = mirrorCreator([
  'FETCH_PRODUCTS_REQUEST',
  'FETCH_PRODUCTS_SUCCESS',
  'FETCH_PRODUCTS_FAILURE',
  'SET_SELECTED_PRODUCT_ID',
  'ADD_TO_CART',
  'ADD_TO_CART_SUCCESS',
  'ADD_TO_CART_FAILURE',
  'UPDATE_CART_VALUE',
  'REMOVE_FROM_CART',
  'REMOVE_FROM_CART_SUCCESS',
  'REMOVE_FROM_CART_FAILURE',
  'PROCESS_ORDER',
  'PROCESS_ORDER_SUCCESS',
  'PROCESS_ORDER_FAILURE',
]);

export function fetchProductsRequest() {
  return {
    type: types.FETCH_PRODUCTS_REQUEST,
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: types.FETCH_PRODUCTS_SUCCESS,
    products,
  };
}

export function fetchProductsFail(error) {
  return {
    type: types.FETCH_PRODUCTS_FAILURE,
    error,
  };
}

export function setSelectedProductId(selectedProductId) {
  return {
    type: types.SET_SELECTED_PRODUCT_ID,
    selectedProductId,
  };
}

export function addToCart(product) {
  return {
    type: types.ADD_TO_CART,
    product,
  };
}

export function addToCartSuccess(cartProducts) {
  return {
    type: types.ADD_TO_CART_SUCCESS,
    cartProducts,
  };
}

export function addToCartFailure(error) {
  return {
    type: types.ADD_TO_CART_FAILURE,
    error,
  };
}

export function removeFromCart(product) {
  return {
    type: types.REMOVE_FROM_CART,
    product,
  };
}

export function removeFromCartSuccess(cartProducts) {
  return {
    type: types.REMOVE_FROM_CART_SUCCESS,
    cartProducts,
  };
}

export function removeFromCartFailure(error) {
  return {
    type: types.REMOVE_FROM_CART_FAILURE,
    error,
  };
}

export function updateCartValue(cartValue) {
  return {
    type: types.UPDATE_CART_VALUE,
    cartValue,
  };
}

export function processOrder() {
  return {
    type: types.PROCESS_ORDER,
  };
}

export function processOrderSuccess() {
  return {
    type: types.PROCESS_ORDER_SUCCESS,
  };
}

export function processOrderFailure(error) {
  return {
    type: types.PROCESS_ORDER_FAILURE,
    error,
  };
}

const initialState = {
  products: [],
  error: '',
  selectedProductId: null,
  cartProducts: [],
  updateCartSuccess: false,
  cartValue: 0,
  isLoading: false,
  processOrderSuccess: false,
};

const productsRedux = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.products,
        error: '',
      };
    }
    case types.FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        error: 'There was an error!',
      };
    }
    case types.SET_SELECTED_PRODUCT_ID: {
      return {
        ...state,
        selectedProductId: action.selectedProductId,
        updateCartSuccess: false,
        error: '',
      };
    }
    case types.ADD_TO_CART: {
      return {
        ...state,
      };
    }
    case types.ADD_TO_CART_SUCCESS: {
      return {
        ...state,
        cartProducts: action.cartProducts,
        updateCartSuccess: true,
      };
    }
    case types.ADD_TO_CART_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case types.REMOVE_FROM_CART: {
      return {
        ...state,
      };
    }
    case types.REMOVE_FROM_CART_SUCCESS: {
      return {
        ...state,
        cartProducts: action.cartProducts,
        updateCartSuccess: true,
      };
    }
    case types.REMOVE_FROM_CART_FAILURE: {
      return {
        ...state,
        error: action.error,
      };
    }
    case types.UPDATE_CART_VALUE: {
      return {
        ...state,
        cartValue: action.cartValue,
      };
    }
    case types.PROCESS_ORDER: {
      return {
        ...state,
        isLoading: true,
        processOrderSuccess: false,
        error: '',
      };
    }
    case types.PROCESS_ORDER_SUCCESS: {
      return {
        ...state,
        processOrderSuccess: true,
        isLoading: false,
      };
    }
    case types.PROCESS_ORDER_FAILURE: {
      return {
        ...state,
        processOrderSuccess: false,
        isLoading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export const productTypes = types;
export default productsRedux;

export const getCartProducts = (state) => state.products.cartProducts;
export const getUserDetail = (state) => state.auth.user;
