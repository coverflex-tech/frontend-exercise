import React from "react";
import { render, act, waitForElement } from "@testing-library/react";
// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import * as products from "../api/products";
import * as users from "../api/users";
import * as orders from "../api/orders";

describe("App", () => {
  beforeEach(() => {
    jest.spyOn(products, "getProducts").mockResolvedValue([
      { id: "netflix", name: "Netflix", price: 40 },
      { id: "spotify", name: "Spotify", price: 40 },
      { id: "worten", name: "Worten 20% Discount", price: 20 },
      { id: "tap", name: "TAP Airlines 12% Discount", price: 60 },
      { id: "health-insurance", name: "Health Insurance", price: 250 },
      { id: "equipment-insurance", name: "Personal Equipment Insurance", price: 60 },
    ]);

    jest.spyOn(users, "getUser").mockResolvedValue({
      user_id: "username",
      data: { balance: 500, product_ids: [] },
      inserted_at: "2020-03-15T21:11:41",
    });

    jest.spyOn(orders, "postOrder").mockResolvedValue({
      order_id: "123",
      data: {
        items: [
          { id: "netflix", name: "Netflix", price: 40 },
          { id: "spotify", name: "Spotify", price: 40 },
        ],
        total: 500,
      },
    });
  });

  afterEach(() => {
    products.getProducts.mockRestore();
    users.getUser.mockRestore();
    orders.postOrder.mockRestore();
  });

  test("renders the login page at the start of the application", async () => {
    await act(async () => {
      const { getByText } = render(<App />);

      const linkElement = await waitForElement(() => getByText(/Login/i));
      expect(linkElement).toBeInTheDocument();
    });
  });
});
