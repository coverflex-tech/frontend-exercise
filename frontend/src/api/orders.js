import { API_BASE_URL, ORDERS_PATH } from "./constants";

export const postOrder = (items, userId) => {
  return fetch(`${API_BASE_URL}${ORDERS_PATH}`, {
    method: "POST",
    body: JSON.stringify({ items: items, user_id: userId }),
  })
    .then(response => response.json())
    .then(json => json.order);
};
