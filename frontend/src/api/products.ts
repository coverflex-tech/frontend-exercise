import { get } from "./client";

export const getProducts = () => {
  return get(`/products`);
};
