import { User, FetchUserInput } from "./types";
import { ActionTypes } from "../types";

export const fetchUserRequest = (payload: FetchUserInput) => {
  return {
    type: ActionTypes.FETCH_USER_REQUEST,
    payload,
  };
};

export const fetchUserSuccess = (user: User) => {
  return {
    type: ActionTypes.FETCH_USER_SUCCESS,
    user,
  };
};

export const fetchUserError = () => {
  return {
    type: ActionTypes.FETCH_USER_ERROR,
  };
};
