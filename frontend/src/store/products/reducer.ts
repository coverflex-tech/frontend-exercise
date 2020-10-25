import { AnyAction } from "redux";
import { ActionTypes } from "../types";
import { ProductState } from "./types";

export const initialProductState: ProductState = { products: [] };

export const productReducer = (
  state = initialProductState,
  action: AnyAction
) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS_REQUEST:
    case ActionTypes.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        products: [],
      };
    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
};
