import { INITIAL_STATE } from "store/constants";

export const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem('state');
  
      if (serializedState === null) {
        return INITIAL_STATE;
      }
  
      return JSON.parse(serializedState);
  
    } catch (err) {
      return INITIAL_STATE;
    }
  };
  
  export const saveState = (state: State) => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem('state', serializedState);
    } catch (err) {
        console.error("Unable to save state");
    }
  };