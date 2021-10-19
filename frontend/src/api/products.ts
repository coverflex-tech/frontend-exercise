import { get, post } from "./client";

export type Product = { id: string; name: string; price: number };
export type ProductResponse = { products: Product[] };

export const getProducts = (): Promise<ProductResponse> => {
  return get<ProductResponse>(`products`);
};

type Order = {
  id: string;
  name: string;
  price: number;
};

export type OrderResponse = {
  order: { order_id: string; data: { items: Order[]; total: number } };
};

export type OrderBody = {
  order: { items: string[]; user_id: string };
};

export const createOrder = (body: OrderBody): Promise<OrderResponse> => {
  return post<OrderResponse, OrderBody>("orders", body);
};
