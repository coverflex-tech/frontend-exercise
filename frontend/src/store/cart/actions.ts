import { Product } from "../products";
import { ActionTypes } from "../types";

export const addProductToCart = (product: Product) => {
  return {
    type: ActionTypes.ADD_PRODUCT_TO_CART,
    product,
  };
};
