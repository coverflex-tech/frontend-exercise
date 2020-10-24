import { AnyAction } from "redux";
import { ActionTypes } from "../types";
import { UserState } from "./types";

export const initialUserState: UserState = {
  user: "",
};

export const userReducer = (state = initialUserState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_REQUEST:
      return {
        ...state,
        user: action.username,
      };
    default:
      return state;
  }
};
