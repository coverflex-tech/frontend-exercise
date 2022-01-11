import { useState } from "react";
import Basket from "./Basket";
import Main from "./Main";

export default function Home(props) {
    const [cartItems, setCartItems] = useState(props.cartItems); // Inicial state

    const onAddProduct = (product) => {
        const hasProduct = cartItems.find((x) => x.id === product.id);
        if (hasProduct) {
            alert("users aren't allowed to order a product previously ordered")
        } else {
            setCartItems([...cartItems, product]); // Add new product to basket
        }
    };

    const onRemoveProduct = (product) => {
        const hasProduct = cartItems.find((x) => x.id === product.id);
        if (hasProduct) {
            setCartItems(cartItems.filter((x) => x.id !== product.id)); // Remove product from basket
        }
    };

    return (
        <div id="main-container">
            <Main
                onAddProduct={onAddProduct}
            ></Main>
            <Basket
                onAddProduct={onAddProduct}
                onRemoveProduct={onRemoveProduct}
                cartItems={cartItems}
            ></Basket>
        </div>
    )
}
