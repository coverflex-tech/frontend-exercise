import { ActionTypes } from "./types";

export const fetchUserRequest = (username: string) => {
  return {
    type: ActionTypes.FETCH_USER_REQUEST,
    username,
  };
};
