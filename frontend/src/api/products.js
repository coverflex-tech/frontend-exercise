import { API_BASE_URL } from "./constants";

export const getProducts = () => {
  return fetch(`${API_BASE_URL}/api/products`)
    .then(response => response.json())
    .then(json => json.products);
};
