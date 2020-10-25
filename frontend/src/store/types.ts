import { UserState } from "./user";
import { ProductState } from "./products";
import { CartState } from "./cart";

export interface StoreState {
  userState: UserState;
  productState: ProductState;
  cartState: CartState;
}

export const ActionTypes = {
  FETCH_USER_REQUEST: "FETCH_USER_REQUEST",
  FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS",
  FETCH_USER_ERROR: "FETCH_USER_ERROR",
  FETCH_PRODUCTS_REQUEST: "FETCH_PRODUCTS_REQUEST",
  FETCH_PRODUCTS_SUCCESS: "FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_ERROR: "FETCH_PRODUCTS_ERROR",
  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
};
