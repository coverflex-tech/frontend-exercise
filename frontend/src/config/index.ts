import { createStore } from "redux";
import { rootReducer } from "../store";

export const configureStore = () => {
  return createStore(rootReducer);
};
