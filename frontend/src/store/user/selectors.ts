import { StoreState } from "../types";
import { User } from "./types";

export const isAuthenticated = (state: StoreState): boolean => {
  return state.userState.user !== undefined;
};

export const getUser = (state: StoreState): User | undefined => {
  return state.userState.user;
};
