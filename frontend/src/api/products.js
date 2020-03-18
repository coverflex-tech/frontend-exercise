import { API_BASE_URL, PRODUCTS_PATH } from "./constants";

export const getProducts = () => {
  return fetch(`${API_BASE_URL}${PRODUCTS_PATH}`)
    .then(response => response.json())
    .then(json => json.products);
};
