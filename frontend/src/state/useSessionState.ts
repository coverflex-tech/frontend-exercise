import { useEffect, useRef } from "react";
import { useAuth } from "./UserContext";

// this maintains logged in state when the user changes the url manually
export const useSessionState = () => {
  const isFirstLoad = useRef(true);
  const {
    dispatch,
    state: { auth },
  } = useAuth();
  useEffect(() => {
    const getSessionUser = () => {
      if (auth || !isFirstLoad.current) return;
      const user = sessionStorage.getItem("user");
      console.log("trying to load from session");

      try {
        if (user) {
          dispatch({ type: "login_success", payload: JSON.parse(user) });
        }
      } catch (error) {
        console.error("failed to read user from session storage");
      } finally {
        isFirstLoad.current = false;
      }
    };
    getSessionUser();
  }, [auth, dispatch]);
};
