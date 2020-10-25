export interface ProductState {
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
}
