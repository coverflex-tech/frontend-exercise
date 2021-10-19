import { HTTPError } from "ky";
import { createOrder, OrderResponse, Product } from "../api/products";
import { User } from "../api/user";
import { Dispatch } from "./StateContext";

const errorMapping = {
  products_not_found: "Product(s) not found, please try again",
  products_already_purchased:
    "Product(s) already purchased, you can't order the same thing twice",
  insufficient_balance: "Your out of flex points",
};

export const purchase = (
  dispatch: Dispatch,
  selectedItems: Product[],
  user: User
) => {
  dispatch({ type: "order_start" });

  createOrder({
    order: {
      items: selectedItems.map((item) => item.id),
      user_id: user!.user_id,
    },
  })
    .then((resp: OrderResponse) => {
      dispatch({
        type: "order_completed",
        payload: {
          items: resp.order.data.items.map((item) => item.id),
          value: resp.order.data.total,
        },
      });
    })
    .catch(async (reason: HTTPError) => {
      const json: { error: keyof typeof errorMapping } =
        await reason.response.json();

      const error =
        json.error && errorMapping.hasOwnProperty(json.error)
          ? errorMapping[json.error]
          : reason.response.statusText;

      dispatch({ type: "order_failed", payload: { error } });
    });
};
