import "@testing-library/jest-dom";
import { Action, Reducer, State } from "./StateContext";

const INITIAL_STATE = {
  authenticated: true,
  authError: null,
  orderError: null,
  loadingAuth: false,
  loadingOrder: false,
  user: {
    user_id: "user1",
    data: { balance: 500, product_ids: ["1", "2"] },
  },
};

describe("reducer", () => {
  describe("on order completed", () => {
    it("should properly update user with correct products", () => {
      const action: Action = {
        type: "order_completed",
        payload: { items: ["3"], value: 200 },
      };

      const state = Reducer(INITIAL_STATE, action);

      const expectedUser = {
        user_id: "user1",
        data: { balance: 300, product_ids: ["1", "2", "3"] },
      };

      expect(state.user).toEqual(expectedUser);
    });
  });

  describe("on order failed", () => {
    it("should set order error to error payload and loading to false", () => {
      const action: Action = {
        type: "order_failed",
        payload: { error: "Erro" },
      };

      const state = Reducer(INITIAL_STATE, action);

      const expectedState: State = {
        ...INITIAL_STATE,
        orderError: "Erro",
        loadingOrder: false,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe("on order idle", () => {
    it("should reset order state", () => {
      const action: Action = {
        type: "order_idle",
      };
      const initialState: State = {
        ...INITIAL_STATE,
        loadingOrder: true,
        orderError: "something",
      };

      const state = Reducer(initialState, action);

      const expectedState: State = {
        ...INITIAL_STATE,
        orderError: null,
        loadingOrder: false,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe("on order start", () => {
    it("should be loading and reset error state", () => {
      const action: Action = {
        type: "order_start",
      };
      const initialState: State = {
        ...INITIAL_STATE,
        loadingOrder: false,
        orderError: "something",
      };

      const state = Reducer(initialState, action);

      const expectedState: State = {
        ...INITIAL_STATE,
        orderError: null,
        loadingOrder: true,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe("on login start", () => {
    it("should be loading and reset error state", () => {
      const initialState: State = {
        ...INITIAL_STATE,
        authenticated: false,
        user: null,
        authError: "bla",
        loadingAuth: false,
      };

      const action: Action = {
        type: "login_start",
      };

      const state = Reducer(initialState, action);

      const expectedState: State = {
        ...initialState,
        loadingAuth: true,
        authError: null,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe("on login success", () => {
    it("should set user to action payload and reset error and loading state", () => {
      const action: Action = {
        type: "login_success",
        payload: {
          user: {
            data: { balance: 500, product_ids: ["1"] },
            user_id: "user1",
          },
        },
      };

      const initialState: State = {
        ...INITIAL_STATE,
        authenticated: false,
        user: null,
        loadingAuth: true,
      };

      const state = Reducer(initialState, action);

      const expectedState: State = {
        ...initialState,
        user: action.payload.user,
        authenticated: true,
        loadingAuth: false,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe("on login failed", () => {
    it("should set auth error to action payload and reset loading state", () => {
      const action: Action = {
        type: "login_failed",
        payload: {
          error: "login error",
        },
      };

      const initialState: State = {
        ...INITIAL_STATE,
        authenticated: false,
        user: null,
        loadingAuth: true,
      };

      const state = Reducer(initialState, action);

      const expectedState: State = {
        ...initialState,
        authError: action.payload.error,
        authenticated: false,
        user: null,
        loadingAuth: false,
      };

      expect(state).toEqual(expectedState);
    });
  });

  describe("on logout", () => {
    it("should reset auth state", () => {
      const action: Action = {
        type: "logout",
      };

      const state = Reducer(INITIAL_STATE, action);

      const expectedState: State = {
        ...INITIAL_STATE,
        authenticated: false,
        user: null,
        loadingAuth: false,
      };

      expect(state).toEqual(expectedState);
    });
  });
});
