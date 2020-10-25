import { Product } from "../products";
import { ActionTypes } from "../types";

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
