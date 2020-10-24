import { ActionTypes } from "./types";

export const fetchUserRequest = (username: string) => {
  return {
    type: ActionTypes.FETCH_USER_REQUEST,
    username,
  };
};

export const fetchUserSuccess = (username: string) => {
  return {
    type: ActionTypes.FETCH_USER_SUCCESS,
    username,
  };
};

export const fetchUserError = () => {
  return {
    type: ActionTypes.FETCH_USER_ERROR,
  };
};
