import { Product } from "./types";
import { ActionTypes } from "../types";

export const fetchProductsRequest = () => {
  return {
    type: ActionTypes.FETCH_PRODUCTS_REQUEST,
  };
};

export const fetchProductsSuccess = (products: Product[]) => {
  return {
    type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
    products,
  };
};

export const fetchProductsError = () => {
  return {
    type: ActionTypes.FETCH_PRODUCTS_ERROR,
  };
};
