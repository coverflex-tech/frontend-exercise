interface Product {
    id: string; name: string; price: number
}

interface ProductArray extends Array<Product>{}

export type {Product, ProductArray}