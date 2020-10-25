import { combineReducers } from "redux";
import { StoreState } from "./types";
import { userReducer, initialUserState } from "./user";
import { productReducer, initialProductState } from "./products";
import { cartReducer, initialCartState } from "./cart";

export const initialState: StoreState = {
  userState: initialUserState,
  productState: initialProductState,
  cartState: initialCartState,
};

export const rootReducer = combineReducers({
  userState: userReducer,
  productState: productReducer,
  cartState: cartReducer,
});
