import { combineReducers } from "redux";
import { StoreState } from "./types";
import { userReducer, initialUserState } from "./user";
import { productReducer, initialProductState } from "./products";

export const initialState: StoreState = {
  userState: initialUserState,
  productState: initialProductState,
};

export const rootReducer = combineReducers({
  userState: userReducer,
  productState: productReducer,
});
