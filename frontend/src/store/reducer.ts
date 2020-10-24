import { combineReducers } from "redux";
import { StoreState } from "./types";
import { userReducer, initialUserState } from "./user";

export const initialState: StoreState = {
  userState: initialUserState,
};

export const rootReducer = combineReducers({
  userState: userReducer,
});
