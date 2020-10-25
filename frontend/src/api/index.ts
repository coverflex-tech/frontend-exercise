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

export interface FetchProductsOutput {
  products: { id: string; name: string; price: number }[];
}

export const fetchProducts = (): Promise<FetchProductsOutput> => {
  return fetch(getApiUrl(`/api/products`)).then((response) => response.json());
};
