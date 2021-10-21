import { useEffect, useRef } from "react";
import { useAppState } from "./StateContext";

// this maintains logged in state when the user changes the url manually
export const useSessionState = () => {
  const isFirstLoad = useRef(true);
  const {
    dispatch,
    state: { authenticated },
  } = useAppState();
  useEffect(() => {
    const getSessionUser = () => {
      if (authenticated || !isFirstLoad.current) return;
      const user = sessionStorage.getItem("user");
      console.log("trying to load from session");

      try {
        if (user) {
          dispatch({
            type: "login_success",
            payload: { user: JSON.parse(user) },
          });
        }
      } catch (error) {
        console.error("failed to read user from session storage");
      } finally {
        isFirstLoad.current = false;
      }
    };
    getSessionUser();
  }, [authenticated, dispatch]);
};
