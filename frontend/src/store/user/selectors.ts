import { StoreState } from "../types";

export const isAuthenticated = (state: StoreState): boolean => {
  return state.userState.user !== undefined;
};
