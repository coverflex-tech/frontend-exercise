import { Product } from "../products";

export interface CartState {
  products: Product[];
  loading: boolean;
}

export interface OrderInput {
  items: Product[];
  callbacks: { success: () => void };
}

export interface OrderSuccess {
  items: Product[];
  total: number;
}
