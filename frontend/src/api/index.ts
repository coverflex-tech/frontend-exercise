const getApiUrl = (path: string): string => {
  return `${process.env.REACT_APP_API_URL}${path}`;
};

export interface FetchUserOutput {
  user: {
    user_id: string;
    data: { balance: number };
  };
}

export const fetchUser = (userId: string): Promise<FetchUserOutput> => {
  return fetch(getApiUrl(`/api/users/${userId}`)).then((response) =>
    response.json()
  );
};

export interface ProductOutput {
  id: string;
  name: string;
  price: number;
}

export interface FetchProductsOutput {
  products: ProductOutput[];
}

export const fetchProducts = (): Promise<FetchProductsOutput> => {
  return fetch(getApiUrl(`/api/products`)).then((response) => response.json());
};

export interface PostOrderInput {
  items: string[];
  user_id: string;
}

export interface PostOrderOutput {
  order: { data: { items: ProductOutput[]; total: number } };
}

export const postOrder = (input: PostOrderInput): Promise<PostOrderOutput> => {
  return fetch(getApiUrl(`/api/orders`), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order: input,
    }),
  }).then((response) => response.json());
};
