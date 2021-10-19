import "@testing-library/jest-dom";
import { Action, Reducer } from "./StateContext";

const INITIAL_STATE = {
  auth: true,
  authError: null,
  orderError: null,
  loadingAuth: false,
  loadingOrder: false,
  user: {
    user_id: "user1",
    data: { balance: 500, product_ids: ["1", "2"] },
  },
};

describe("User reducer", () => {
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
});
