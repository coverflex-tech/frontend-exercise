import React from "react";
import { User } from "../api/user";

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
  | { type: "order_start" }
  | { type: "order_completed"; payload: OrderPayload }
  | { type: "order_failed"; payload: ErrorPayload }
  | { type: "order_idle" };

export type Dispatch = (action: Action) => void;

export type State = {
  authenticated: boolean;
  user: User | null;
  authError: string | null;
  orderError: string | null;
  loadingAuth: boolean;
  loadingOrder: boolean;
};

export type StateProviderProps = { children: React.ReactNode };

const StateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const Reducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "login_start": {
      return { ...state, loadingAuth: true, authError: null };
    }
    case "login_success": {
      return {
        ...state,
        authenticated: true,
        user: action.payload.user,
        loadingAuth: false,
        authError: null,
      };
    }
    case "login_failed": {
      return {
        ...state,
        authenticated: false,
        user: null,
        loadingAuth: false,
        authError: action.payload.error,
      };
    }
    case "logout": {
      return { ...state, authenticated: false, user: null };
    }
    case "order_start": {
      return { ...state, loadingOrder: true, orderError: null };
    }
    case "order_failed": {
      return {
        ...state,
        orderError: action.payload.error,
        loadingOrder: false,
      };
    }
    case "order_idle": {
      return {
        ...state,
        orderError: null,
        loadingOrder: false,
      };
    }
    case "order_completed": {
      const newBalance = state.user!.data.balance - action.payload.value;
      const newItemList = [
        ...new Set([...state.user!.data.product_ids, ...action.payload.items]),
      ];
      const newUser = {
        ...state.user!,
        data: {
          ...state.user!.data,
          balance: newBalance,
          product_ids: newItemList,
        },
      };
      return {
        ...state,
        loadingOrder: false,
        orderError: null,
        user: newUser,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

export function StateProvider({ children }: StateProviderProps) {
  const [state, dispatch] = React.useReducer(Reducer, {
    authenticated: false,
    user: null,
    loadingAuth: false,
    loadingOrder: false,
    authError: null,
    orderError: null,
  });

  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

export function useAppState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
}
