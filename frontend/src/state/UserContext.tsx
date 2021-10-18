import * as React from "react";
import { authenticateUser, User, UserResponse } from "../api/user";

type Payload = {
  user: User | null;
};

type ErrorPayload = {
  error: string | null;
};

type OrderPayload = {
  value: number;
  items: string[];
};

export type Action =
  | { type: "login_start" }
  | { type: "logout" }
  | { type: "login_success"; payload: Payload }
  | { type: "login_failed"; payload: ErrorPayload }
  | { type: "order_completed"; payload: OrderPayload };

export type Dispatch = (action: Action) => void;
type State = {
  auth: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
};
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const UserReducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "login_start": {
      return { ...state, loading: true };
    }
    case "login_success": {
      return {
        auth: true,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    }
    case "login_failed": {
      return {
        auth: false,
        user: null,
        loading: false,
        error: action.payload.error,
      };
    }
    case "logout": {
      return { ...state, auth: false, user: null };
    }
    case "order_completed": {
      const newBalance = state.user!.data.balance - action.payload.value;
      const newItemList = [
        ...new Set([...state.user!.data.product_ids, ...action.payload.items]),
      ];
      console.log("order_completed", {
        newBalance,
        newItemList,
        balance: state.user?.data.balance,
        items: state.user?.data.product_ids,
      });

      return {
        ...state,
        user: {
          ...state.user!,
          data: {
            ...state.user!.data,
            balance: newBalance,
            product_ids: newItemList,
          },
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = React.useReducer(UserReducer, {
    auth: false,
    user: null,
    error: null,
    loading: false,
  });

  const value = { state, dispatch };
  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}

async function login(
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

function logout(dispatch: Dispatch, callback: () => void) {
  dispatch({ type: "logout" });
  sessionStorage.removeItem("user");
  callback();
}

export { UserProvider, useAuth, login, logout };
