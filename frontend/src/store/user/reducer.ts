import { AnyAction } from "redux";
import { ActionTypes } from "../types";
import { Product } from "../products";
import { UserState } from "./types";

export const initialUserState: UserState = {};

export const userReducer = (state = initialUserState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_REQUEST:
    case ActionTypes.FETCH_USER_ERROR:
      return {
        ...state,
        user: undefined,
      };
    case ActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case ActionTypes.POST_ORDER_SUCCESS:
      const { items, total } = action.result;
      const user = state.user;

      if (!user) return state;

      user.balance -= total;
      user.purchases = [
        ...user.purchases,
        ...items.map((item: Product) => item.id),
      ];

      return {
        ...state,
        user,
      };
    default:
      return state;
  }
};
