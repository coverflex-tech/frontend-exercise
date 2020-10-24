import { UserState } from "./user";

export interface StoreState {
  userState: UserState;
}

export const ActionTypes = {
  FETCH_USER_REQUEST: "FETCH_USER_REQUEST",
};
