import { User } from "./user";
import { ActionTypes } from "./types";

export const fetchUserRequest = (username: string) => {
  return {
    type: ActionTypes.FETCH_USER_REQUEST,
    username,
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
