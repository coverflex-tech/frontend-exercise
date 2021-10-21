import { render, fireEvent } from "@testing-library/react";
import { Login } from "./Login";

var mockLogin = jest.fn();
jest.mock("../state/userActions", () => ({
  getUser: () => {
    mockLogin();
  },
}));

var mockDispatch = jest.fn();
jest.mock("../state/StateContext", () => ({
  useAppState: () => ({
    dispatch: mockDispatch,
    state: { authenticated: false, authError: null, loadingAuth: false },
  }),
}));

describe("login", () => {
  describe("when input is empty", () => {
    it("should not allow the user to login", () => {
      const { getByTestId } = render(<Login />);
      const button = getByTestId("login-button");
      fireEvent.click(button);
      expect(mockLogin).not.toBeCalled();
    });
  });
  describe("when input is not empty", () => {
    it("should call login action", () => {
      const { getByPlaceholderText, getByTestId } = render(<Login />);
      const input = getByPlaceholderText("Type in your username here");
      fireEvent.change(input, { target: { value: "user" } });
      expect((input as HTMLInputElement).value).toBe("user");
      const button = getByTestId("login-button");
      fireEvent.click(button);

      expect(mockLogin).toBeCalled();
    });
  });
});
