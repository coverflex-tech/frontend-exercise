import { Product } from "../products";

export interface CartState {
  products: Product[];
}

export interface OrderSuccess {
  items: Product[];
  total: number;
}
