import { authenticateUser, UserResponse } from "../api/user";
import { Dispatch } from "./StateContext";

export async function getUser(
  dispatch: Dispatch,
  username: string,
  callback?: () => void
) {
  dispatch({ type: "login_start" });

  authenticateUser(username)
    .then(({ user }: UserResponse) => {
      dispatch({ type: "login_success", payload: { user } });
      sessionStorage.setItem("user", JSON.stringify(user));
      if (callback) callback();
    })
    .catch((reason) => {
      dispatch({
        type: "login_failed",
        payload: { error: reason.message },
      });
    });
}

export function logout(dispatch: Dispatch, callback: () => void) {
  dispatch({ type: "logout" });
  sessionStorage.removeItem("user");
  callback();
}
