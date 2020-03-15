import { API_BASE_URL } from "./constants";

export const postOrder = (items, userId) => {
  return fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    body: JSON.stringify({ items: items, user_id: userId }),
  })
    .then(response => response.json())
    .then(json => json.order);
};
