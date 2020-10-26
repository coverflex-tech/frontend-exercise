import { AnyAction } from "redux";
import { ActionTypes } from "../types";
import { CartState } from "./types";

export const initialCartState: CartState = { products: [], loading: false };

export const cartReducer = (state = initialCartState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: [...state.products, { ...action.product }],
      };
    case ActionTypes.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          (cartItem) => cartItem.id !== action.productId
        ),
      };
    case ActionTypes.POST_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.POST_ORDER_SUCCESS:
      return {
        ...state,
        products: [],
        loading: false,
      };
    default:
      return state;
  }
};
