import { Product } from "../products";
import { ActionTypes } from "../types";
import { OrderSuccess, OrderInput } from "./types";

export const addProductToCart = (product: Product) => {
  return {
    type: ActionTypes.ADD_PRODUCT_TO_CART,
    product,
  };
};

export const removeProductFromCart = (productId: string) => {
  return {
    type: ActionTypes.REMOVE_PRODUCT_FROM_CART,
    productId,
  };
};

export const postOrderRequest = (input: OrderInput) => {
  return {
    type: ActionTypes.POST_ORDER_REQUEST,
    input,
  };
};

export const postOrderSuccess = (result: OrderSuccess) => {
  return {
    type: ActionTypes.POST_ORDER_SUCCESS,
    result,
  };
};
