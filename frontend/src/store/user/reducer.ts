import { AnyAction } from "redux";
import { ActionTypes } from "../types";
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
    default:
      return state;
  }
};
