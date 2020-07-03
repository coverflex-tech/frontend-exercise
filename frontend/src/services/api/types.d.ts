interface UserDetails {
    user: {
        user_id: string;
        data: {
            balance: number;
            product_ids: string[];
        };
    };
}

interface Product {
    id: string;
    name: string;
    price: number;
}

interface ProductsResponse {
    products: Product[];
}
